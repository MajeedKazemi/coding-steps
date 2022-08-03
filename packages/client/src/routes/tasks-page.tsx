import React, { useContext } from "react";

import { apiUserNextTask, logError } from "../api/api";
import { CodingTask } from "../components/coding-task";
import { Layout } from "../components/layout";
import { Loader } from "../components/loader";
import { MultipleChoiceTask } from "../components/multiple-choice-task";
import { ShortAnswerTask } from "../components/short-answer-task";
import { WatchTutorialTask } from "../components/watch-video-task";
import { AuthContext } from "../context";
import { TaskType } from "../utils/constants";

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
            .catch((error: any) => {
                logError(error.toString());
            });
    };

    const getTaskComponent = () => {
        switch (task.type) {
            case TaskType.Authoring:
            case TaskType.Modifying:
                return (
                    <CodingTask
                        key={task.id}
                        taskId={task.id}
                        output={task.output}
                        solution={task.solution}
                        description={task.description}
                        timeLimit={task.timeLimit}
                        starterCode={
                            task.type === TaskType.Authoring
                                ? ""
                                : task.starterCode
                        }
                        onCompletion={setNextTask}
                        showCodex={
                            task.type === TaskType.Authoring &&
                            context?.user?.editorType === "copilot"
                        }
                        taskType={task.type}
                    ></CodingTask>
                );

            case TaskType.MultipleChoice:
                return (
                    <MultipleChoiceTask
                        key={task.id}
                        id={task.id}
                        description={task.description}
                        choices={task.choices}
                        onCompletion={setNextTask}
                        taskType={task.type}
                    ></MultipleChoiceTask>
                );

            case TaskType.ShortAnswer:
                return (
                    <ShortAnswerTask
                        key={task.id}
                        id={task.id}
                        description={task.description}
                        onCompletion={setNextTask}
                        taskType={task.type}
                    ></ShortAnswerTask>
                );

            case TaskType.WatchVideo:
                return (
                    <WatchTutorialTask
                        key={task.id}
                        id={task.id}
                        description={task.description}
                        onCompletion={setNextTask}
                        taskType={task.type}
                    ></WatchTutorialTask>
                );
        }
    };

    React.useEffect(() => {
        setNextTask();
    }, []);

    if (!loading && !task)
        return (
            <Layout>
                <div className="container">
                    <div className="card p-md">
                        <p>
                            Congratulations, you have finished all the tasks!
                            Please wait for further instructions.
                        </p>
                    </div>
                </div>
            </Layout>
        );

    return <Layout>{task ? getTaskComponent() : <Loader />}</Layout>;
};
