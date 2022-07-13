import * as monaco from "monaco-editor";
import { Fragment, useContext, useEffect, useState } from "react";
import { apiUserSubmitTask, logError } from "../api/api";

import { AuthContext } from "../context";
import { TaskType } from "../utils/constants";
import { Button } from "./button";

interface IMultipleChoiceTaskProps {
    id: string;
    title: string;
    description: string;
    choices?: string[];

    taskType: TaskType;

    onCompletion: () => void;
}

export const MultipleChoiceTask = (props: IMultipleChoiceTaskProps) => {
    const { context } = useContext(AuthContext);
    const [completed, setCompleted] = useState(false);
    const [userChoice, setUserChoice] = useState<number>(-1);
    const [canSubmit, setCanSubmit] = useState(false);
    const [startedAt, setStartedAt] = useState(new Date());

    const handleSubmitCode = () => {
        try {
            apiUserSubmitTask(
                context?.token,
                props.id,
                { choice: userChoice },
                new Date(),
                startedAt
            )
                .then(async (response) => {
                    const data = await response.json();

                    if (data.completed) {
                        setCompleted(true);
                        props.onCompletion();
                    }
                })
                .catch((error: any) => {
                    logError(error.toString());
                });
        } catch (error: any) {
            logError(error.toString());
        }
    };

    useEffect(() => {
        if (userChoice !== undefined && userChoice >= 0) {
            setCanSubmit(true);
        } else {
            setCanSubmit(false);
        }
    }, [userChoice]);

    useEffect(() => {
        Array.from(document.getElementsByClassName("code-block")).forEach(
            (block) => {
                monaco.editor.colorizeElement(block as HTMLElement, {
                    theme: "vs",
                });
            }
        );
    }, []);

    return (
        <div className="simple-task-container">
            <section className="simple-task-info">
                <div>
                    <span className="task-title">
                        Task: <h2>{props.title}</h2>
                    </span>
                    <span className="task-subtitle">
                        <p
                            dangerouslySetInnerHTML={{
                                __html: props.description,
                            }}
                        ></p>
                    </span>
                    <form>
                        <p>Please select from one of the following options:</p>
                        {props.choices?.map((choice, index) => {
                            return (
                                <Fragment key={index}>
                                    <input
                                        type="radio"
                                        name="choice"
                                        value={index}
                                        checked={userChoice === index}
                                        onChange={() => setUserChoice(index)}
                                    />
                                    <label onClick={() => setUserChoice(index)}>
                                        {choice}
                                    </label>
                                    <br />
                                </Fragment>
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
