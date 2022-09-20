import React, { useContext, useEffect, useRef, useState } from "react";

import { apiGetAggregatedData } from "../api/api";
import { AnalysisComponent } from "../components/analysis-component";

const allTaskIds: Array<string> = [];

for (let i = 1; i <= 45; i++) {
    allTaskIds.push(i.toString());
}

export const AnalysisPage = () => {
    const [taskData, setTaskData] = useState([]);
    const [selectedTaskId, setSelectedTaskId] = useState("1");

    useEffect(() => {
        apiGetAggregatedData(selectedTaskId)
            .then(async (response) => {
                const data = await response.json();

                setTaskData(data.data);
            })
            .catch((error: any) => {
                console.error(error);
            });
    }, [selectedTaskId]);

    return (
        <div className="analysis-page">
            <div>
                <select
                    onChange={(e) => {
                        setSelectedTaskId(e.target.value);
                    }}
                    size={3}
                >
                    {allTaskIds.map((id) => (
                        <option key={id} value={id}>
                            {id}
                        </option>
                    ))}
                </select>
            </div>
            {taskData.map((d: any) => {
                return (
                    <AnalysisComponent
                        key={d["user_id"]}
                        authoring={d["authoring"]}
                        modifying={d["modifying"]}
                        userId={d["user_id"]}
                    ></AnalysisComponent>
                );
            })}
        </div>
    );
};
