import { Fragment, useContext, useEffect, useRef, useState } from "react";

import {
    apiLogEvents,
    apiUserEvaluateCode,
    apiUserGradingStatus,
    apiUserStartTask,
    apiUserSubmitTask,
    logError,
} from "../api/api";
import { AuthContext } from "../context";
import { TaskType } from "../utils/constants";
import { getLogObject } from "../utils/logger";
import { convertTime } from "../utils/shared";
import { Button } from "./button";
import { Editor } from "./editor";

interface CodingTaskProps {
    taskId: string;
    description: string;
    output: Array<Array<string>>;
    solution: string;
    timeLimit: number;
    starterCode?: string;

    taskType: TaskType;
    showCodex: boolean;

    onCompletion: () => void;
}

export const CodingTask = (props: CodingTaskProps) => {
    const { context, setContext } = useContext(AuthContext);
    const editorRef = useRef<any>(null);

    const [started, setStarted] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [skipped, setSkipped] = useState(false);

    const [startTime, setStartTime] = useState(Date.now());
    const [elapsedTime, setElapsedTime] = useState(0);
    const [checkingTime, setCheckingTime] = useState(0);
    const [reachedTimeLimit, setReachedTimeLimit] = useState(false);

    const [beingGraded, setBeingGraded] = useState(false);
    const [blink, setBlink] = useState(false);

    const [feedback, setFeedback] = useState("");
    const [userCode, setUserCode] = useState("");

    const [canSubmit, setCanSubmit] = useState(false);

    const sendLog = () => {
        apiLogEvents(
            context?.token,
            props.taskId,
            getLogObject(props.taskId, context?.user?.id)
        )
            .then(() => {})
            .catch((error) => {
                logError("sendLog: " + error.toString());
            });
    };

    const handleSkipTask = () => {
        apiUserSubmitTask(
            context?.token,
            props.taskId,
            {
                code: userCode,
            },
            new Date()
        )
            .then(async (response) => {
                sendLog();

                if (props.taskType == TaskType.Authoring) {
                    editorRef.current?.setCode(props.solution);
                    setSkipped(true);
                } else {
                    setCompleted(true);
                    props.onCompletion();
                }
            })
            .catch((error: any) => {
                logError("handleSkipTask: " + error.toString());
            });
    };

    const handleGradeCode = () => {
        apiUserEvaluateCode(context?.token, props.taskId, userCode)
            .then(async (response) => {
                const data = await response.json();

                if (data.success) {
                    setBeingGraded(true);
                }
            })
            .catch((error: any) => {
                logError("handleGradeCode: " + error.toString());
            });
    };

    const handleStart = () => {
        const now = Date.now();

        apiUserStartTask(context?.token, props.taskId)
            .then(async (response) => {
                const data = await response.json();

                if (data.success) {
                    setStarted(true);

                    if (data.canContinue) {
                        if (data.feedback) {
                            setFeedback(data.feedback);
                        }

                        setStartTime(Date.parse(data.startedAt));
                        setCheckingTime(data.checkingTime);
                        setElapsedTime(
                            now - Date.parse(data.startedAt) - data.checkingTime
                        );
                    } else {
                        setStartTime(now);
                        setElapsedTime(now - startTime);
                    }

                    if (data.beingGraded) {
                        // the user has already submitted the task and should wait for the result
                        setBeingGraded(true);
                    }
                }
            })
            .catch((error: any) => {
                logError("handleStart: " + error.toString());
            });
    };

    const getGradingStatus = (timerId: any) => {
        apiUserGradingStatus(context?.token, props.taskId)
            .then(async (response) => {
                const data = await response.json();

                if (!data.beingGraded) {
                    setBeingGraded(false);
                    setCheckingTime(data.checkingTime);
                    clearInterval(timerId);
                    setFeedback(data.feedback);

                    if (data.passed) {
                        sendLog();

                        setCompleted(true);
                        props.onCompletion(); // go to the next task
                    }
                }
            })
            .catch((error: any) => {
                logError("apiUserGradingStatus: " + error.toString());
            });
    };

    useEffect(() => {
        if (beingGraded) {
            const id = setInterval(() => {
                // check task status
                // if completed, either pass or fail
                getGradingStatus(id);
            }, 1000);

            return () => {
                clearInterval(id);
            };
        }
    }, [beingGraded]);

    useEffect(() => {
        const id = setInterval(() => {
            if (!beingGraded) {
                setElapsedTime(Date.now() - startTime - checkingTime);

                // is there enough time to continue?
                if (elapsedTime / 1000 > props.timeLimit) {
                    setReachedTimeLimit(true);

                    if (elapsedTime / 1000 > props.timeLimit * 2) {
                        setBlink(!blink);
                    }
                }
            }
        }, 1000);

        return () => {
            clearInterval(id);
        };
    }, [startTime, beingGraded, elapsedTime, blink]);

    const handleGoNextTask = () => {
        setCompleted(true);
        props.onCompletion();
    };

    useEffect(() => {
        if (userCode.length > 10) {
            setCanSubmit(true);
        } else {
            setCanSubmit(false);
        }
    }, [userCode]);

    if (beingGraded) {
        return (
            <div className="container">
                <div className="card p-md">
                    <p>
                        Your submission is being graded. We will get back to you
                        soon. Your timer is paused.
                    </p>
                </div>
            </div>
        );
    }

    if (!started) {
        return (
            <div className="container">
                <div className="card p-md">
                    <p>
                        You have{" "}
                        <span className="remaining-time">
                            {convertTime(props.timeLimit)} minutes
                        </span>{" "}
                        to finish this task.
                    </p>
                    <button className="btn btn-primary" onClick={handleStart}>
                        Start task
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="coding-task-container">
            <section className="task-info">
                <div className="task-description-container">
                    <span className="task-title">Task Description:</span>
                    <span className="task-subtitle">
                        <p
                            dangerouslySetInnerHTML={{
                                __html: props.description,
                            }}
                        ></p>
                    </span>

                    <span className="task-sample-output-header">Sample:</span>
                    {props.output.map((lines, i) => {
                        return (
                            <div
                                key={`sample-out-key-${i}`}
                                className="task-sample-output"
                            >
                                <span>
                                    {lines.map((line, j) => {
                                        return (
                                            <p
                                                key={`sample-line-key-${j}`}
                                                dangerouslySetInnerHTML={{
                                                    __html: line,
                                                }}
                                            ></p>
                                        );
                                    })}
                                </span>
                            </div>
                        );
                    })}

                    {feedback ? (
                        <div className="task-feedback-container">
                            <span className="feedback-header">Feedback:</span>
                            <span className="feedback-content">{feedback}</span>
                        </div>
                    ) : null}
                </div>

                <div className="task-submission-buttons-container">
                    {reachedTimeLimit && !skipped ? (
                        <Button
                            class="skip-button"
                            onClick={handleSkipTask}
                            type="block"
                            color="warning"
                        >
                            {props.taskType === TaskType.Authoring
                                ? "Skip Task + See Solution"
                                : "Skip Task"}
                        </Button>
                    ) : null}
                    {skipped ? (
                        <Button
                            onClick={handleGoNextTask}
                            type="block"
                            color="warning"
                        >
                            Start Next Task
                        </Button>
                    ) : null}

                    {!skipped ? (
                        <div className="submit-container">
                            <Button
                                class={blink ? "btn-attention" : ""}
                                onClick={handleGradeCode}
                                type="block"
                                disabled={!canSubmit}
                            >
                                {beingGraded
                                    ? "Being Graded"
                                    : "Submit to Grade"}
                            </Button>

                            {reachedTimeLimit ? (
                                <div className="submit-urgent-message">
                                    <span>Please submit the code sooner!</span>

                                    <span className="time-indicator">
                                        {convertTime(elapsedTime / 1000)}
                                    </span>
                                </div>
                            ) : null}
                        </div>
                    ) : null}
                </div>
            </section>

            <Editor
                ref={editorRef}
                showCodex={props.showCodex}
                taskId={props.taskId}
                starterCode={props.starterCode ? props.starterCode : ""}
                updateCode={setUserCode}
            />
        </div>
    );
};
