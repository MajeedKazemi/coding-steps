import React, { useContext, useEffect, useRef, useState } from "react";

import { apiGetAggregatedDataFromTaskList } from "../api/api-analysis";
import { AnalysisComponent } from "../components/analysis-component";

export const AnalysisCodexListPage = () => {
    const [taskData, setTaskData] = useState([]);
    const [taskListText, setTaskListText] = useState("");
    const [taskList, setTaskList] = useState<
        Array<{
            userId: string;
            taskId: string;
        }>
    >([]);

    useEffect(() => {
        if (taskList?.length > 0) {
            apiGetAggregatedDataFromTaskList(taskList)
                .then(async (response) => {
                    const data = await response.json();

                    setTaskData(data);
                })
                .catch((error: any) => {
                    console.error(error);
                });
        }
    }, [taskList]);

    return (
        <div className="analysis-page">
            <div>
                <textarea
                    rows={10}
                    cols={50}
                    placeholder="taskId, userId"
                    value={taskListText}
                    onChange={(e) => {
                        setTaskListText(e.target.value);
                    }}
                ></textarea>
                <br />
                <button
                    onClick={() => {
                        const newTaskList = [];
                        const lines = taskListText.split("\n");

                        for (const line of lines) {
                            const [taskId, userId] = line.split(",");
                            if (taskId && userId) {
                                newTaskList.push({
                                    taskId: taskId.trim(),
                                    userId: userId.trim(),
                                });
                            }
                        }

                        setTaskList(newTaskList);
                    }}
                >
                    load
                </button>
            </div>

            {taskData.map((d: any) => {
                return (
                    <AnalysisComponent
                        description={d["task_description"]}
                        key={d["task_id"] + d["user_id"]}
                        authoring={d["authoring"]}
                        modifying={d["modifying"]}
                        userId={d["user_id"]}
                        taskId={d["task_id"]}
                    ></AnalysisComponent>
                );
            })}
        </div>
    );
};
