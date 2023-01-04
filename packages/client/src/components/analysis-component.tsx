import { useContext } from "react";

import { AuthContext } from "../context";
import { CodeViewer } from "./analysis-code-viewer";
import { Diff } from "./diff-component";

interface IProps {
    authoring: [];
    modifying: [];
    taskId: string;
    userId: string;
    description: string;
}

export const AnalysisComponent = (props: IProps) => {
    const { context } = useContext(AuthContext);

    const renderPart = (item: any, i: number, type: string) => {
        const taskType = type === "authoring" ? "A" : "M";

        if (item["type"] == "codex") {
            const partialCopy = item["partial-copy"];
            const copiedEverything = item["copied-everything"];
            const message = copiedEverything
                ? "copied-everything"
                : partialCopy
                ? "partial-copy"
                : null;

            return (
                <div
                    className="analysis-part"
                    key={"analysis-part-" + i.toString() + "-" + type}
                >
                    <div className="analysis-header codex-color">
                        {"( " +
                            i +
                            " ) " +
                            ">>> CODEX <<<" +
                            " (" +
                            taskType +
                            ")"}
                    </div>
                    <p className="prompt-header">
                        prompt:{" "}
                        <span className="prompt-message">{item["prompt"]}</span>
                    </p>
                    <span className="analysis-point codex-color">
                        similarity: {item["similarity"]}
                    </span>
                    {message && (
                        <span className="analysis-point codex-color">
                            {message}
                        </span>
                    )}
                    <CodeViewer code={item["generated_code"]} />
                </div>
            );
        } else if (item["type"] == "run") {
            return (
                <div
                    className="analysis-part"
                    key={"analysis-part-" + i.toString() + "-" + type}
                >
                    <div className="analysis-header run-color">
                        {"( " +
                            i +
                            " ) " +
                            ">>> RUN <<<" +
                            " (" +
                            taskType +
                            ")"}
                    </div>

                    <CodeViewer code={item["code"]}></CodeViewer>

                    <div className="run-console">
                        <h2>console output:</h2>

                        {item["io"].map((item: any) => {
                            switch (item["type"]) {
                                case "in":
                                    return (
                                        <div className="run-color-in">
                                            {"<<--"} {item["text"]}
                                        </div>
                                    );

                                case "out":
                                    return (
                                        <div className="run-color-out">
                                            {"-->>"} {item["text"]}
                                        </div>
                                    );

                                case "err":
                                    return (
                                        <div className="run-color-err">
                                            {"<!!>"} {item["text"]}
                                        </div>
                                    );
                            }
                        })}
                    </div>
                </div>
            );
        } else if (item["type"] == "submit") {
            return (
                <div
                    className="analysis-part"
                    key={"analysis-part-" + i.toString() + "-" + type}
                >
                    <div className="analysis-header submit-color">
                        {"( " +
                            i +
                            " ) " +
                            ">>> SUBMIT <<<" +
                            " (" +
                            taskType +
                            ")"}
                    </div>
                    {item["feedback"] !== "" && (
                        <span className="analysis-point submit-color">
                            feedback: {item["feedback"]}
                        </span>
                    )}
                    <CodeViewer code={item["submitted_code"]}></CodeViewer>
                </div>
            );
        } else if (item["type"] == "edit" && item["editor"] == "user") {
            return (
                <div
                    className="analysis-part"
                    key={"analysis-part-" + i.toString() + "-" + type}
                >
                    <div className="analysis-header edit-color">
                        {"( " +
                            i +
                            " ) " +
                            ">>> EDIT <<<" +
                            " (" +
                            taskType +
                            ")"}
                    </div>
                    <span className="analysis-point edit-color">
                        key-strokes: {item["key_strokes"]}
                    </span>

                    <div className="code-viewer-side-by-side">
                        <div className="code-viewer-half">
                            <CodeViewer code={item["prev_code"]}></CodeViewer>
                        </div>

                        <div className="code-viewer-half">
                            <CodeViewer code={item["new_code"]}></CodeViewer>
                        </div>
                    </div>

                    <Diff old={item["prev_code"]} new={item["new_code"]}></Diff>
                </div>
            );
        } else if (item["type"] == "doc") {
            return (
                <div
                    className="analysis-part"
                    key={"analysis-part-" + i.toString() + "-" + type}
                >
                    <div className="analysis-header doc-color">
                        {"( " +
                            i +
                            " ) " +
                            ">>> DOCUMENTATION <<<" +
                            " (" +
                            taskType +
                            ")"}
                    </div>
                    <ul>
                        {item["sections"].map((it: any) => {
                            return <li key={it["section"]}>{it["section"]}</li>;
                        })}
                    </ul>
                </div>
            );
        }
    };

    return (
        <div className="analysis-component" key={props.taskId + props.userId}>
            <h1>
                task-id: {props.taskId} -- user-id: {props.userId}
            </h1>
            <h2>Authoring Task:</h2>
            <p>
                <b>Task Description:</b> {props.description}
            </p>
            {props.authoring.map((it, i) => renderPart(it, i, "authoring"))}

            <h2>Modifying Task:</h2>
            {props.modifying.map((it, i) => renderPart(it, i, "modifying"))}
        </div>
    );
};
