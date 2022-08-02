import * as monaco from "monaco-editor";
import { Fragment, useContext, useEffect, useRef, useState } from "react";

import { apiUserSubmitTask, logError } from "../api/api";
import { AuthContext } from "../context";
import { TaskType } from "../utils/constants";
import { Button } from "./button";

interface IMultipleChoiceTaskProps {
    id: string;
    description: string;
    choices?: string[];

    taskType: TaskType;

    onCompletion: () => void;
}

export const MultipleChoiceTask = (props: IMultipleChoiceTaskProps) => {
    const { context } = useContext(AuthContext);
    const [completed, setCompleted] = useState(false);
    const [userChoice, setUserChoice] = useState<number | null>(null);
    const [userChoiceText, setUserChoiceText] = useState<string | null>(null);
    const [canSubmit, setCanSubmit] = useState(false);
    const [startedAt, setStartedAt] = useState(new Date());
    const taskContainerEl = useRef<HTMLDivElement>(null);

    const handleSubmitCode = () => {
        apiUserSubmitTask(
            context?.token,
            props.id,
            { choiceIndex: userChoice, choiceText: userChoiceText },
            new Date(),
            startedAt
        )
            .then(async (response) => {
                const data = await response.json();

                setCompleted(true);
                props.onCompletion();
            })
            .catch((error: any) => {
                logError(error.toString());
            });
    };

    useEffect(() => {
        if (userChoice !== null && userChoice >= 0) {
            setCanSubmit(true);
        } else {
            setCanSubmit(false);
        }
    }, [userChoice]);

    useEffect(() => {
        if (taskContainerEl.current) {
            Array.from(
                taskContainerEl.current.getElementsByClassName("code-block")
            )?.forEach((block) => {
                monaco.editor.colorizeElement(block as HTMLElement, {
                    theme: "vs",
                    mimeType: "python",
                    tabSize: 4,
                });
            });
        }
    }, [taskContainerEl]);

    return (
        <div className="simple-task-container">
            <section className="simple-task-info">
                <div ref={taskContainerEl}>
                    <span className="task-title">
                        Multiple Choice Question:
                    </span>
                    <span className="task-subtitle">
                        <p
                            dangerouslySetInnerHTML={{
                                __html: props.description,
                            }}
                        ></p>
                    </span>
                    <hr />
                    <form>
                        <p>Select from one of the following options:</p>
                        {props.choices?.map((choice, index) => {
                            return (
                                <div className="task-response-item" key={index}>
                                    <input
                                        className="task-response-radio"
                                        type="radio"
                                        name="choice"
                                        value={index}
                                        checked={userChoice === index}
                                        onChange={() => {
                                            setUserChoice(index);
                                            setUserChoiceText(choice);
                                        }}
                                    />
                                    <label
                                        dangerouslySetInnerHTML={{
                                            __html: choice,
                                        }}
                                        onClick={() => {
                                            setUserChoice(index);
                                            setUserChoiceText(choice);
                                        }}
                                    ></label>
                                    <br />
                                </div>
                            );
                        })}
                    </form>
                </div>

                <div className="">
                    <br />
                    <Button onClick={handleSubmitCode} disabled={!canSubmit}>
                        submit answer
                    </Button>
                </div>
            </section>
        </div>
    );
};
