import React, { useContext } from "react";

import { CodingTask } from "../components/coding-task";
import { Layout } from "../components/layout";
import { Loader } from "../components/loader";
import { AuthContext } from "../context";
import { EditorType, TaskType } from "../utils/constants";

export const TasksPage = () => {
    const context = useContext(AuthContext);
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

    return <Layout>{task ? taskComponent : <Loader />}</Layout>;
};
