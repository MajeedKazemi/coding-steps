import * as monaco from "monaco-editor";
import { Fragment, useContext, useEffect, useMemo, useState } from "react";

import { AuthContext } from "../context";
import { EditorType, TaskType } from "../utils/constants";
import { Button } from "./button";

interface IShortAnswerTask {
    id: string;
    title: string;
    description: string;

    taskType: TaskType;
    editorType: EditorType;

    onCompletion: () => void;
}

export const ShortAnswerTask = (props: IShortAnswerTask) => {
    const context = useContext(AuthContext);
    const [completed, setCompleted] = useState(false);
    const [userAnswer, setUserAnswer] = useState<string>("");
    const [canSubmit, setCanSubmit] = useState(false);

    const handleSubmitCode = () => {
        fetch("http://localhost:3001/api/tasks/submit", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${context.token}`,
            },
            body: JSON.stringify({
                taskId: props.id,
                finishedAt: Date.now(),
                data: { events: [], answer: userAnswer },
            }),
        }).then(async (response) => {
            const data = await response.json();

            if (data.completed) {
                setCompleted(true);
                props.onCompletion();
            }
        });

        // send code to server and wait for response
        // check if code is correct, set completed to true -> coding-page should render next task
        // if not -> show what was expected
    };

    useEffect(() => {
        if (userAnswer !== undefined && userAnswer.length > 0) {
            setCanSubmit(true);
        } else {
            setCanSubmit(false);
        }
    }, [userAnswer]);

    useEffect(() => {
        Array.from(document.getElementsByClassName("code-block")).forEach(
            (block) => {
                monaco.editor.colorizeElement(block as HTMLElement, {});
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
                        <p>Your response:</p>
                        <textarea
                            className="short-answer-textarea"
                            placeholder="Enter your answer here..."
                            rows={3}
                            onChange={(e) => {
                                setUserAnswer(e.target.value);
                            }}
                        ></textarea>
                    </form>
                </div>

                <div className="">
                    <Button onClick={handleSubmitCode} disabled={!canSubmit}>
                        submit answer
                    </Button>
                </div>
            </section>
        </div>
    );
};
