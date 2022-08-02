import * as monaco from "monaco-editor";
import { Range } from "monaco-editor";
import { useContext, useRef, useState } from "react";
import { apiGenerateCodex, logError } from "../api/api";

import { AuthContext } from "../context";
import { log, LogType } from "../utils/logger";
import { Button } from "./button";

interface ICodexProps {
    taskId: string;
    editor?: monaco.editor.IStandaloneCodeEditor | null;
}

export const Codex = (props: ICodexProps) => {
    const [description, setDescription] = useState<string>("");
    const { context, setContext } = useContext(AuthContext);
    const [waiting, setWaiting] = useState(false);
    const [feedback, setFeedback] = useState<string>("");
    // const [checked, setChecked] = useState(true);

    // const textareaRef = useRef<HTMLTextAreaElement>(null);

    const generateCode = () => {
        if (description.length === 0) {
            setFeedback(
                "You should write an instruction of the code that you want to be generated."
            );
        } else {
            setWaiting(true);
            props.editor?.updateOptions({ readOnly: true });

            const focusedPosition = props.editor?.getPosition();
            const userCode = props.editor?.getValue();
            // let codeContext = "";

            // if (focusedPosition && userCode && checked) {
            //     codeContext = userCode
            //         .split("\n")
            //         .slice(0, focusedPosition.lineNumber + 1)
            //         .join("\n");
            // }

            try {
                apiGenerateCodex(
                    context?.token,
                    description,
                    userCode ? userCode : ""
                )
                    .then(async (response) => {
                        props.editor?.updateOptions({ readOnly: false });

                        if (response.ok && props.editor) {
                            const data = await response.json();

                            let text = data.code;

                            if (text.length > 0) {
                                setFeedback("");
                                log(
                                    props.taskId,
                                    context?.user?.id,
                                    LogType.PromptEvent,
                                    {
                                        code: text,
                                        description: description,
                                    }
                                );

                                let insertLine = 0;
                                let insertColumn = 1;

                                let curLineNumber = 0;
                                let curColumn = 0;

                                let highlightStartLine = 0;
                                let highlightStartColumn = 0;
                                let highlightEndLine = 0;
                                let highlightEndColumn = 0;

                                const curPos = props.editor.getPosition();
                                const curCodeLines = props.editor
                                    .getValue()
                                    .split("\n");

                                if (curPos) {
                                    curLineNumber = curPos.lineNumber;
                                    curColumn = curPos.column;
                                }

                                let curLineText =
                                    curCodeLines[curLineNumber - 1];
                                let nextLineText =
                                    curLineNumber < curCodeLines.length
                                        ? curCodeLines[curLineNumber]
                                        : null;

                                if (curColumn === 1) {
                                    // at the beginning of a line
                                    if (curLineText !== "") {
                                        text += "\n";
                                        insertLine = curLineNumber;
                                        insertColumn = 1;

                                        highlightStartLine = curLineNumber;
                                        highlightStartColumn = curColumn;

                                        const textLines = text.split("\n");

                                        highlightEndLine =
                                            curLineNumber +
                                            textLines.length -
                                            1;
                                        highlightEndColumn = 1;
                                    } else {
                                        insertLine = curLineNumber;
                                        insertColumn = 1;

                                        highlightStartLine = curLineNumber;
                                        highlightStartColumn = curColumn;

                                        highlightEndLine =
                                            curLineNumber +
                                            text.split("\n").length;
                                        highlightEndColumn = 1;
                                    }
                                } else if (curColumn !== 1) {
                                    // in the middle of a line
                                    if (nextLineText !== "") {
                                        text = "\n" + text;
                                        insertLine = curLineNumber;
                                        insertColumn = curLineText.length + 1;

                                        const textLines = text.split("\n");

                                        highlightStartLine = curLineNumber + 1;
                                        highlightStartColumn = 1;

                                        highlightEndLine =
                                            curLineNumber +
                                            text.split("\n").length -
                                            1;
                                        highlightEndColumn =
                                            textLines[textLines.length - 1]
                                                .length + 1;
                                    } else {
                                        insertLine = curLineNumber + 1;
                                        insertColumn = 1;

                                        highlightStartLine = curLineNumber;
                                        highlightStartColumn = curColumn;

                                        highlightEndLine =
                                            curLineNumber +
                                            text.split("\n").length;
                                        highlightEndColumn = 1;
                                    }
                                }

                                props.editor.executeEdits("module", [
                                    {
                                        range: new Range(
                                            insertLine,
                                            insertColumn,
                                            insertLine,
                                            insertColumn
                                        ),
                                        text: text,
                                        forceMoveMarkers: true,
                                    },
                                ]);

                                const decoration =
                                    props.editor.deltaDecorations(
                                        [],
                                        [
                                            {
                                                range: new monaco.Range(
                                                    highlightStartLine,
                                                    highlightStartColumn,
                                                    highlightEndLine,
                                                    highlightEndColumn
                                                ),
                                                options: {
                                                    className:
                                                        "highlighted-code",
                                                    isWholeLine: true,
                                                    stickiness:
                                                        monaco.editor
                                                            .TrackedRangeStickiness
                                                            .NeverGrowsWhenTypingAtEdges,
                                                    hoverMessage: [
                                                        {
                                                            value: `This code was generated from this description: *${description}*.`,
                                                        },
                                                    ],
                                                },
                                            },
                                        ]
                                    );

                                setTimeout(() => {
                                    props.editor?.deltaDecorations(
                                        decoration,
                                        []
                                    );
                                }, 1000);

                                // props.editor.addContentWidget({
                                //     getId: function () {
                                //         return "my.content.widget";
                                //     },
                                //     getDomNode: function () {
                                //         if (!generatedCodeButton) {
                                //             generatedCodeButton =
                                //                 document.createElement("div");
                                //             generatedCodeButton.innerHTML =
                                //                 "<button>Accept Code</button><button>Reject Code</button>";
                                //         }

                                //         return generatedCodeButton;
                                //     },
                                //     getPosition: function () {
                                //         return {
                                //             position: {
                                //                 lineNumber: highlightEndLine,
                                //                 column: highlightEndColumn + 20,
                                //             },
                                //             preference: [
                                //                 monaco.editor
                                //                     .ContentWidgetPositionPreference.ABOVE,
                                //                 monaco.editor
                                //                     .ContentWidgetPositionPreference.BELOW,
                                //             ],
                                //         };
                                //     },
                                // });
                            } else {
                                const words = description.split(" ").length;

                                if (words < 10) {
                                    setFeedback(
                                        "Try to be more descriptive. For example, you can use some of the keywords from the documentation to create more specific instructions."
                                    );
                                } else if (words > 30) {
                                    setFeedback(
                                        "Try to break down the instructions into smaller more direct and more specific instructions."
                                    );
                                }
                            }

                            props.editor?.focus();
                            setWaiting(false);
                            props.editor?.updateOptions({ readOnly: false });
                        }
                    })
                    .catch((error) => {
                        props.editor?.updateOptions({ readOnly: false });
                        setWaiting(false);
                        logError(error.toString());
                    });
            } catch (error: any) {
                props.editor?.updateOptions({ readOnly: false });
                setWaiting(false);
                logError(error.toString());
            }
        }
    };

    return (
        <div className="codex-container">
            <span className="codex-description-label">
                Code Generator Instructions:
            </span>
            <textarea
                // ref={textareaRef}
                className="codex-description-input"
                placeholder="Describe the behavior of the code to be generated..."
                onChange={(e) => {
                    setDescription(e.target.value.trim());
                }}
                onKeyUp={(e) => {
                    if (e.key === "Enter") {
                        generateCode();
                    }
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                    }
                }}
            ></textarea>
            <Button
                disabled={waiting}
                type="block-big"
                onClick={() => {
                    generateCode();
                }}
            >
                {waiting ? "Generating" : "Generate Code"}
            </Button>
            {feedback ? (
                <div className="codex-feedback">
                    <p>Hint: {feedback}</p>
                </div>
            ) : null}
            {/* <div className="context-checkbox-container">
                <input
                    type="checkbox"
                    value="Use Code Before Cursor"
                    checked={checked}
                    onChange={(e) => {
                        setChecked(!checked);
                    }}
                ></input>
                <label>Use Code Before Cursor as Context</label>

                {checked ? (
                    <p>
                        The code generator will generate code based on the
                        provided instructions and the current code (before the
                        cursor in the editor). So for example you could specify
                        what to do with a particular variable that is in the
                        editor.
                    </p>
                ) : (
                    <p>
                        The code generator will generate code independently from
                        the code that you have in the editor.
                    </p>
                )}
            </div> */}
        </div>
    );
};
