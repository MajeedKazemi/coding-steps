import * as monaco from "monaco-editor";
import { Fragment, useContext, useEffect, useRef, useState } from "react";

import { apiUserSubmitTask, logError } from "../api/api";
import { AuthContext } from "../context";
import { TaskType } from "../utils/constants";
import { Button } from "./button";

interface IWatchVideoTaskProps {
    id: string;
    description: string;
    taskType: TaskType;

    onCompletion: () => void;
}

export const WatchVideoTask = (props: IWatchVideoTaskProps) => {
    const { context } = useContext(AuthContext);
    const [completed, setCompleted] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);
    const [startedAt, setStartedAt] = useState(new Date());

    const handleSubmitCode = () => {
        apiUserSubmitTask(context?.token, props.id, {}, new Date(), startedAt)
            .then(async (response) => {
                const data = await response.json();

                setCompleted(true);
                props.onCompletion();
            })
            .catch((error: any) => {
                logError(error.toString());
            });
    };

    // useEffect(() => {
    //     if (userChoice !== null && userChoice >= 0) {
    //         setCanSubmit(true);
    //     } else {
    //         setCanSubmit(false);
    //     }
    // }, [userChoice]);

    return (
        <div className="simple-task-container">
            <section className="simple-task-info">
                <div>
                    <video></video>
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
