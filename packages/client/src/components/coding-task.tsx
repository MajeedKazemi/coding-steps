import { Fragment, useContext, useEffect, useRef, useState } from "react";

import { apiLogEvents, apiUserStartTask, apiUserSubmitTask, logError } from "../api/api";
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

    const [startTime, setStartTime] = useState(Date.now());
    const [elapsedTime, setElapsedTime] = useState(0);
    const [reachedTimeLimit, setReachedTimeLimit] = useState(false);

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

    const handleSubmitTask = () => {
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

                setCompleted(true);
                props.onCompletion();
            })
            .catch((error: any) => {
                logError("handleSkipTask: " + error.toString());
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
                        setElapsedTime(now - Date.parse(data.startedAt));
                    } else {
                        setStartTime(now);
                        setElapsedTime(now - startTime);
                    }
                }
            })
            .catch((error: any) => {
                logError("handleStart: " + error.toString());
            });
    };

    useEffect(() => {
        const id = setInterval(() => {
            setElapsedTime(Date.now() - startTime);

            // is there enough time to continue?
            if (elapsedTime / 1000 > props.timeLimit) {
                setReachedTimeLimit(true);

                if (elapsedTime / 1000 > props.timeLimit * 2) {
                    setBlink(!blink);
                }
            }
        }, 1000);

        return () => {
            clearInterval(id);
        };
    }, [startTime, elapsedTime, blink]);

    useEffect(() => {
        if (userCode.length > 10) {
            setCanSubmit(true);
        } else {
            setCanSubmit(false);
        }
    }, [userCode]);

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
                    <div className="submit-container">
                        <div className="submit-attention">
                            <b>ATTENTION</b>
                            <br />
                            <br />
                            You can only submit <b>ONCE</b>. You will <b>NOT</b>{" "}
                            receive feedback. So please double-check your
                            solution before submitting.
                        </div>
                        <br />
                        <Button
                            class={blink ? "btn-attention" : ""}
                            onClick={handleSubmitTask}
                            type="block"
                            disabled={!canSubmit}
                        >
                            Submit and Start Next Task
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
