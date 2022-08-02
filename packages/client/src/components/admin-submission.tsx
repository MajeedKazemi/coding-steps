import * as monaco from "monaco-editor";
import { useContext, useEffect, useRef, useState } from "react";
import ReactDiffViewer from "react-diff-viewer";

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
                    height: 30 * props.submission.code.split("\n").length,
                },
                minimap: { enabled: false },
                wordWrap: "on",
                wrappingIndent: "indent",
            });

            setEditor(editor);
        }
    }, [monacoEl.current]);

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
                    {/* <span>{props.submission.submittedAt}</span> */}
                    <h2>Task {props.submission.taskId}</h2>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: props.submission.taskDescription,
                        }}
                    ></p>
                    <div ref={monacoEl} className="editor-user-code"></div>
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
            <div></div>
            <ReactDiffViewer
                oldValue={props.submission.code}
                newValue={props.submission.solution}
                splitView={true}
            />
        </div>
    );
};
