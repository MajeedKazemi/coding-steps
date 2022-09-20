import React, { useContext, useEffect, useRef, useState } from "react";

import { apiGetAggregatedDataKeys, apiGetAggregatedDataPerTask, apiGetAggregatedDataPerUser } from "../api/api";
import { AnalysisComponent } from "../components/analysis-component";

export const AnalysisPage = () => {
    const [taskData, setTaskData] = useState([]);
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [allTaskIds, setAllTaskIds] = useState([]);
    const [allUserIds, setAllUserIds] = useState([]);
    const [perTask, setPerTask] = useState(true);

    useEffect(() => {
        apiGetAggregatedDataKeys()
            .then(async (response) => {
                const data = await response.json();

                setAllTaskIds(data.tasks);
                setAllUserIds(data.users);

                setSelectedTaskId(data.tasks[0]);
                setSelectedUserId(data.users[0]);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        if (selectedTaskId !== null && selectedUserId !== null) {
            if (perTask) {
                apiGetAggregatedDataPerTask(selectedTaskId)
                    .then(async (response) => {
                        const data = await response.json();

                        setTaskData(data.data);
                    })
                    .catch((error: any) => {
                        console.error(error);
                    });
            } else {
                apiGetAggregatedDataPerUser(selectedUserId)
                    .then(async (response) => {
                        const data = await response.json();

                        setTaskData(data.data);
                    })
                    .catch((error: any) => {
                        console.error(error);
                    });
            }
        }
    }, [selectedTaskId, selectedUserId, perTask]);

    return (
        <div className="analysis-page">
            <div>
                <div>
                    <select
                        onChange={(e) => {
                            if (e.target.value === "per-task") {
                                setPerTask(true);
                            } else {
                                setPerTask(false);
                            }
                        }}
                    >
                        <option key={"per-task"} value={"per-task"}>
                            per task
                        </option>{" "}
                        <option key={"per-user"} value={"per-user"}>
                            per user
                        </option>
                    </select>
                </div>
                <div>
                    <select
                        onChange={(e) => {
                            if (perTask) {
                                setSelectedTaskId(e.target.value);
                            } else {
                                setSelectedUserId(e.target.value);
                            }
                        }}
                        size={5}
                    >
                        {perTask
                            ? allTaskIds.map((id) => (
                                  <option key={id} value={id}>
                                      {id}
                                  </option>
                              ))
                            : allUserIds.map((id) => (
                                  <option key={id} value={id}>
                                      {id}
                                  </option>
                              ))}
                    </select>
                </div>
            </div>
            {taskData.map((d: any) => {
                return (
                    <AnalysisComponent
                        description={d["task_description"]}
                        key={d["task_id"] + d["user_id"]}
                        authoring={d["authoring"]}
                        modifying={d["modifying"]}
                        userId={d["user_id"]}
                    ></AnalysisComponent>
                );
            })}
        </div>
    );
};
