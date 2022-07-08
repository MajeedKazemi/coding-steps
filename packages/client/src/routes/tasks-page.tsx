import React, { useContext } from "react";
import { apiUserNextTask } from "../api/api";

import { CodingTask } from "../components/coding-task";
import { Layout } from "../components/layout";
import { Loader } from "../components/loader";
import { MultipleChoiceTask } from "../components/multiple-choice-task";
import { ShortAnswerTask } from "../components/short-answer-task";
import { AuthContext } from "../context";
import { EditorType, TaskType } from "../utils/constants";

export const TasksPage = () => {
    const { context } = useContext(AuthContext);
    const [loading, setLoading] = React.useState(false);
    const [task, setTask] = React.useState<any>(null);

    const setNextTask = () => {
        setLoading(true);

        apiUserNextTask(context?.token)
            .then(async (response) => {
                const data = await response.json();
                setTask(data.task);

                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const getTaskComponent = () => {
        switch (task.type) {
            case TaskType.Authoring:
            case TaskType.Modifying:
                return (
                    <CodingTask
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        description={task.description}
                        timeLimit={task.timeLimit}
                        starterCode={
                            task.type === TaskType.Authoring
                                ? ""
                                : task.starterCode
                        }
                        onCompletion={setNextTask}
                        editorType={EditorType.Copilot}
                        taskType={task.type}
                    ></CodingTask>
                );

            case TaskType.MultipleChoice:
                return (
                    <MultipleChoiceTask
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        description={task.description}
                        choices={task.choices}
                        onCompletion={setNextTask}
                        editorType={EditorType.Copilot}
                        taskType={task.type}
                    ></MultipleChoiceTask>
                );

            case TaskType.ShortAnswer:
                return (
                    <ShortAnswerTask
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        description={task.description}
                        onCompletion={setNextTask}
                        editorType={EditorType.Copilot}
                        taskType={task.type}
                    ></ShortAnswerTask>
                );
        }
    };

    React.useEffect(() => {
        setNextTask();
    }, []);

    if (!loading && !task)
        return (
            <div className="container">
                <div className="card p-md">
                    <p>
                        Congratulations, you have finished all the tasks! Please
                        ask the teacher for further instructors.
                    </p>
                </div>
            </div>
        );

    return <Layout>{task ? getTaskComponent() : <Loader />}</Layout>;
};
