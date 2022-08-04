import * as monaco from "monaco-editor";
import { useContext, useEffect, useRef, useState } from "react";

import { apiAdminSetGrade, logError } from "../api/api";
import { AuthContext } from "../context";
import { ISubmission } from "../types";
import { Button } from "./button";

interface IProps {
    submission: ISubmission;
}

export const AdminSubmission = (props: IProps) => {
    const { context } = useContext(AuthContext);
    const [grade, setGrade] = useState("");
    const [feedback, setFeedback] = useState("");

    const monacoEl = useRef(null);
    const [editor, setEditor] =
        useState<monaco.editor.IStandaloneCodeEditor | null>(null);
    const solutionEl = useRef(null);

    useEffect(() => {
        if (monacoEl && !editor) {
            const editor = monaco.editor.create(monacoEl.current!, {
                value: props.submission.code,
                readOnly: true,
                language: "python",
                automaticLayout: true,
                fontSize: 16,
                lineHeight: 26,
                dimension: {
                    width: 700,
                    height:
                        26 * (props.submission?.code?.split("\n").length + 2),
                },
                minimap: { enabled: false },
                wordWrap: "on",
                wrappingIndent: "indent",
            });

            setEditor(editor);
        }
    }, [monacoEl.current]);

    useEffect(() => {
        if (solutionEl.current) {
            monaco.editor.colorizeElement(solutionEl.current as HTMLElement, {
                theme: "vs",
                mimeType: "python",
                tabSize: 4,
            });
        }
    }, [solutionEl]);

    const handleSubmitGrade = () => {
        if (grade === "pass" || grade === "fail") {
            apiAdminSetGrade(
                context?.token,
                props.submission.taskId,
                props.submission.userId,
                grade === "pass",
                props.submission.submittedAt,
                props.submission.index,
                feedback
            )
                .then(async (response) => {
                    const data = await response.json();

                    if (data.success) {
                        setGrade("");
                    }
                })
                .catch((error: any) => {
                    logError(error.toString());
                });
        }
    };

    return (
        <div className="task-submission-container">
            <div className="task-submission-divider">
                <div className="submitted-code-container">
                    <h2>Task {props.submission.taskId}</h2>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: props.submission.taskDescription,
                        }}
                    ></p>
                    <span>
                        Submission Count: {props.submission.submissionCount}
                    </span>
                    <div ref={monacoEl} className="editor-user-code"></div>

                    <div ref={solutionEl} className="admin-solution-code">
                        {props.submission.solution}
                    </div>
                </div>

                <form
                    className="admin-feedback-container"
                    onSubmit={(e) => {
                        handleSubmitGrade();
                        e.preventDefault();
                    }}
                >
                    <div>
                        <label>Grade </label>
                        <input
                            onChange={(e) => {
                                setGrade(e.target.value.toLowerCase());
                            }}
                        ></input>
                        <br />
                        <br />
                    </div>

                    <div>
                        <label>Feedback</label>
                        <br />
                        <textarea
                            className="feedback-textarea"
                            onChange={(e) => {
                                setFeedback(e.target.value.toLowerCase());
                            }}
                        ></textarea>
                        <br />
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
