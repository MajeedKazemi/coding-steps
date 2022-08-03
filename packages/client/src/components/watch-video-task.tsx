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

export const WatchTutorialTask = (props: IWatchVideoTaskProps) => {
    const { context } = useContext(AuthContext);
    const [completed, setCompleted] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);
    const [startedAt, setStartedAt] = useState(new Date());
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [check3, setCheck3] = useState(false);

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

    useEffect(() => {
        if (
            context?.user?.editorType === "copilot" &&
            check1 &&
            check2 &&
            check3
        ) {
            setCanSubmit(true);
        } else if (
            context?.user?.editorType === "intellisense" &&
            check1 &&
            check3
        ) {
            setCanSubmit(true);
        } else {
            setCanSubmit(false);
        }
    }, [check1, check2, check3]);

    return (
        <div className="simple-task-container">
            <section className="simple-task-info">
                <div className="video-container">
                    {context?.user?.editorType === "copilot" ? (
                        <iframe
                            width="900"
                            height="550"
                            src="https://www.youtube.com/embed/eGfxgTff_xY"
                            title="CodingSteps - Copilot"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <iframe
                            width="900"
                            height="550"
                            src="https://www.youtube.com/embed/tB5oOER_JI8"
                            title="CodingSteps - Intellisense"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    )}
                </div>

                <div className="">
                    <br />
                    <br />
                    <input
                        className="confirm-checkbox"
                        type="checkbox"
                        onChange={(e) => {
                            setCheck1(e.target.checked);
                        }}
                    ></input>
                    <label>I watched the whole video</label>
                    <br />

                    {context?.user?.editorType === "copilot" ? (
                        <Fragment>
                            <input
                                className="confirm-checkbox"
                                type="checkbox"
                                onChange={(e) => {
                                    setCheck2(e.target.checked);
                                }}
                            ></input>
                            <label>
                                I learned about the Code Generator and will use
                                it as much as possible
                            </label>
                            <br />
                        </Fragment>
                    ) : null}

                    <input
                        className="confirm-checkbox"
                        type="checkbox"
                        onChange={(e) => {
                            setCheck3(e.target.checked);
                        }}
                    ></input>
                    <label>
                        I learned about the python documentation and will use it
                        to learn about Python
                    </label>
                    <br />

                    <br />
                    <Button onClick={handleSubmitCode} disabled={!canSubmit}>
                        Start Programming
                    </Button>
                </div>
            </section>
        </div>
    );
};
