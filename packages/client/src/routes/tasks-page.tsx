import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { CodingTask } from "../components/coding-task";
import { UserContext } from "../context";
import { EditorType, TaskType } from "../utils/constants";

export const TasksPage = () => {
    const context = useContext(UserContext);
    const [loading, setLoading] = React.useState(false);
    const [task, setTask] = React.useState<any>(null);

    const setNextTask = () => {
        setLoading(true);

        fetch("http://localhost:3001/api/tasks/next", {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${context.token}`,
            },
        }).then(async (response) => {
            const data = await response.json();
            setTask(data.task);

            setLoading(false);
        });
    };

    React.useEffect(() => {
        setNextTask();
    }, []);

    let taskComponent;

    if (task) {
        taskComponent = (
            <CodingTask
                key={task.id}
                description={task.description}
                editorType={EditorType.Copilot}
                id={task.id}
                taskType={task.type}
                timeLimit={task.timeLimit}
                title={task.title}
                starterCode={
                    task.type === TaskType.Authoring ? "" : task.starterCode
                }
                onCompletion={setNextTask}
            ></CodingTask>
        );
    }

    return (
        <div>
            {task ? (
                <div>{taskComponent}</div>
            ) : (
                <div>
                    <p>Loading...</p>
                </div>
            )}

            <Link to="/">Home</Link>
        </div>
    );
};
