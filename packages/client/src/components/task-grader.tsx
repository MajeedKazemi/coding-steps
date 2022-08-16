import * as monaco from "monaco-editor";
import { PropsWithChildren, useContext, useEffect, useRef, useState } from "react";

import { apiAdminSetFinalGrade, logError } from "../api/api";
import { AuthContext } from "../context";
import { Button } from "./button";

interface IProps {
    code: string;
    feedbacks: Array<string>;
    taskId: string;
    userId: string;
    graded: boolean;
    gradedGrade: number | undefined;
    notModified: boolean;
    receivedDirectHint: boolean;
}

export const TaskGrader = (props: IProps) => {
    const { context } = useContext(AuthContext);
    const [grade, setGrade] = useState<number | undefined>(props.gradedGrade);
    const [submittedGrade, setSubmittedGrade] = useState<number | undefined>(
        props.gradedGrade
    );
    const [receivedDirectHint, setReceivedDirectHint] = useState(
        props.receivedDirectHint
    );
    const [graded, setGraded] = useState(false);
    const [color, setColor] = useState("container-default");

    const monacoEl = useRef(null);
    const [editor, setEditor] =
        useState<monaco.editor.IStandaloneCodeEditor | null>(null);

    useEffect(() => {
        if (monacoEl && !editor) {
            if (props.code.split("\n").length < 100) {
                const editor = monaco.editor.create(monacoEl.current!, {
                    value: props.code,
                    readOnly: true,
                    language: "python",
                    automaticLayout: true,
                    fontSize: 16,
                    lineHeight: 26,
                    dimension: {
                        width: 700,
                        height: 26 * (props.code?.split("\n").length + 2),
                    },
                    minimap: { enabled: false },
                    wordWrap: "on",
                    wrappingIndent: "indent",
                });

                setEditor(editor);
            }
        }
    }, [monacoEl.current]);

    const handleSubmitGrade = () => {
        if (grade !== undefined) {
            apiAdminSetFinalGrade(
                context?.token,
                props.taskId,
                props.userId,
                grade,
                receivedDirectHint
            )
                .then(async (response) => {
                    const data = await response.json();

                    if (data.success) {
                        setGraded(true);
                        setSubmittedGrade(grade);
                    }
                })
                .catch((error: any) => {
                    logError(error.toString());
                });
        }
    };

    useEffect(() => {
        if (submittedGrade !== undefined) {
            if (submittedGrade === grade) {
                setColor("container-green");
            } else {
                setColor("container-orange");
            }
        } else {
            setColor("container-default");
        }
    }, [submittedGrade, grade]);

    const notModifiedMsg = props.notModified ? "NOT MODIFIED" : "";

    return (
        <div className={`task-submission-container ${color}`}>
            <span>userId: {props.userId}</span>
            <br />

            {notModifiedMsg && <h4>{notModifiedMsg}</h4>}

            <div className="task-submission-divider">
                <div className="submitted-code-container">
                    <div>
                        <div ref={monacoEl} className="editor-user-code"></div>
                    </div>
                    <div>
                        {props.feedbacks.map((feedback, index) => (
                            <div key={index}>
                                <p>Feedback {index + 1}:</p>
                                <p>{feedback}</p>
                                <br />
                            </div>
                        ))}
                    </div>
                </div>

                <form
                    className="admin-feedback-container"
                    onSubmit={(e) => {
                        handleSubmitGrade();
                        e.preventDefault();
                    }}
                >
                    <div
                        className="task-response-radio"
                        onClick={() => {
                            setReceivedDirectHint(!receivedDirectHint);
                        }}
                    >
                        <label>Received Direct Hint?</label>
                        <input
                            type="checkbox"
                            checked={receivedDirectHint === true}
                            onChange={() => {
                                setReceivedDirectHint(!receivedDirectHint);
                            }}
                        ></input>
                    </div>
                    <br />
                    <br />
                    <div>
                        <div
                            onClick={() => {
                                setGrade(0);
                            }}
                            className="task-response-radio"
                        >
                            <input
                                type="radio"
                                name="choice"
                                value={0}
                                checked={grade === 0}
                                onChange={() => {
                                    setGrade(0);
                                }}
                            />
                            <label>0%</label>
                        </div>
                        <br />

                        <div
                            onClick={() => {
                                setGrade(25);
                            }}
                            className="task-response-radio"
                        >
                            <input
                                type="radio"
                                name="choice"
                                value={25}
                                checked={grade === 25}
                                onChange={() => {
                                    setGrade(25);
                                }}
                            />
                            <label>25%</label>
                        </div>
                        <br />

                        <div
                            onClick={() => {
                                setGrade(50);
                            }}
                            className="task-response-radio"
                        >
                            <input
                                type="radio"
                                name="choice"
                                value={50}
                                checked={grade === 50}
                                onChange={() => {
                                    setGrade(50);
                                }}
                            />
                            <label>50%</label>
                        </div>
                        <br />

                        <div
                            onClick={() => {
                                setGrade(75);
                            }}
                            className="task-response-radio"
                        >
                            <input
                                type="radio"
                                name="choice"
                                value={75}
                                checked={grade === 75}
                                onChange={() => {
                                    setGrade(75);
                                }}
                            />
                            <label>75%</label>
                        </div>
                        <br />

                        <div
                            onClick={() => {
                                setGrade(100);
                            }}
                            className="task-response-radio"
                        >
                            <input
                                type="radio"
                                name="choice"
                                value={100}
                                checked={grade === 100}
                                onChange={() => {
                                    setGrade(100);
                                }}
                            />
                            <label>100%</label>
                        </div>
                        <br />
                    </div>

                    <Button color="primary" type="block">
                        submit grade
                    </Button>
                </form>
            </div>
            <br />
        </div>
    );
};
