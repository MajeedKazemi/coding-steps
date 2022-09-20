import { useContext } from "react";

import { AuthContext } from "../context";
import { CodeViewer } from "./analysis-code-viewer";
import { Button } from "./button";
import { Diff } from "./diff-component";

interface IProps {
    authoring: [];
    modifying: [];
    userId: string;
}

export const AnalysisComponent = (props: IProps) => {
    const { context } = useContext(AuthContext);

    const renderPart = (item: any, i: number) => {
        if (item["type"] == "codex") {
            const partialCopy = item["partial-copy"];
            const copiedEverything = item["copied-everything"];
            const message = copiedEverything
                ? "copied-everything"
                : partialCopy
                ? "partial-copy"
                : null;

            return (
                <div className="analysis-part">
                    <div className="analysis-header codex-color">
                        {"( " + i + " ) " + ">>> CODEX <<<"}
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
                <div className="analysis-part">
                    <div className="analysis-header run-color">
                        {"( " + i + " ) " + ">>> RUN <<<"}
                    </div>
                    {item["error"] && (
                        <span className="analysis-point run-color">error</span>
                    )}
                    {item["produced_output"] && (
                        <span className="analysis-point run-color">
                            produced output
                        </span>
                    )}
                    {item["provided_input"] && (
                        <span className="analysis-point run-color">
                            provided input
                        </span>
                    )}
                </div>
            );
        } else if (item["type"] == "submit") {
            return (
                <div className="analysis-part">
                    <div className="analysis-header submit-color">
                        {"( " + i + " ) " + ">>> SUBMIT <<<"}
                    </div>
                    <CodeViewer code={item["submitted_code"]}></CodeViewer>
                </div>
            );
        } else if (item["type"] == "edit" && item["editor"] == "user") {
            return (
                <div className="analysis-part">
                    <div className="analysis-header edit-color">
                        {"( " + i + " ) " + ">>> EDIT <<<"}
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
                <div className="analysis-part">
                    <div className="analysis-header doc-color">
                        {"( " + i + " ) " + ">>> DOCUMENTATION <<<"}
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
        <div className="analysis-component">
            <div className="analysis-data">
                <h2>Authoring Task:</h2>
                {props.authoring.map((it, i) => renderPart(it, i))}

                <h2>Modifying Task:</h2>
                {props.modifying.map((it, i) => renderPart(it, i))}
            </div>
            <div className="analysis-input">
                <span>Notes:</span>
                <br />
                <textarea rows={10}></textarea>
                <Button>Submit</Button>
            </div>
        </div>
    );
};
