import { useContext, useState } from "react";

import { UserContext } from "../context";
import { EditorType, TaskType } from "../utils/constants";
import { convertTime } from "../utils/shared";
import { Editor } from "./editor";

interface CodingTaskProps {
    id: string;
    title: string;
    description: string;
    timeLimit: number;
    starterCode?: string;

    taskType: TaskType;
    editorType: EditorType;

    onCompletion: () => void;
}

export const CodingTask = (props: CodingTaskProps) => {
    const context = useContext(UserContext);
    const [feedback, setFeedback] = useState("");
    const [started, setStarted] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [userCode, setUserCode] = useState("");

    const handleStart = () => {
        fetch("http://localhost:3001/api/tasks/start", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${context.token}`,
            },
            body: JSON.stringify({ taskId: props.id, startedAt: Date.now() }),
        }).then(async (response) => {
            const data = await response.json();

            if (data.success) {
                setStarted(true);
            }
        });

        // TODO: store a usertask with startedAt = now() and empty data
        // start timer -> to show that they should've finished the task by now and
        // they can click on the button to get extra time

        // if reloaded, and there is still time left, continue with the amount of time left

        // if reloaded, and there is no time left, simply show if they want to continue (with extra time), or submit the current code
    };

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
                data: { events: [] },
                code: userCode,
            }),
        }).then(async (response) => {
            const data = await response.json();

            if (data.completed) {
                setCompleted(true);
                props.onCompletion();
            } else {
                setFeedback(data.message);
            }
        });

        // send code to server and wait for response
        // check if code is correct, set completed to true -> coding-page should render next task
        // if not -> show what was expected
    };

    if (!started) {
        return (
            <div>
                <p>
                    You have {convertTime(props.timeLimit)} minutes to finish
                    this task.
                </p>
                <button onClick={handleStart}>Start task</button>
            </div>
        );
    }

    return (
        <div>
            <h2>{props.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: props.description }}></p>

            <Editor
                editorType={props.editorType}
                id={props.id}
                starterCode={
                    props.taskType === TaskType.Authoring
                        ? ""
                        : props.starterCode !== undefined
                        ? props.starterCode
                        : ""
                }
                updateCode={setUserCode}
            />

            {feedback && <h3>{feedback}</h3>}

            <button onClick={handleSubmitCode}>submit code</button>

            <div>
                user's code:
                <br />
                <span>{userCode}</span>
            </div>
        </div>
    );
};
