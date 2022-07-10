import * as monaco from "monaco-editor";
import { Range } from "monaco-editor";
import { useContext, useState } from "react";
import { apiGenerateCodex } from "../api/api";

import { AuthContext } from "../context";
import { log, LogType } from "../utils/logger";
import { Button } from "./button";

interface ICodexProps {
    taskId: string;
    editor?: monaco.editor.IStandaloneCodeEditor | null;
}

export const Codex = (props: ICodexProps) => {
    const [description, setDescription] = useState<string>("");
    const { context } = useContext(AuthContext);
    // simply generate code from nothing (completion api)
    // complete next line based on previous code (with optional instructions)

    // select part of the code -> and do something based on the instructions to it (edit api)
    // add code to current context -> will use the

    const generateCode = () => {
        apiGenerateCodex(context?.token, description)
            .then(async (response) => {
                if (response.ok && props.editor) {
                    const data = await response.json();

                    let text = data.code;

                    if (text.length > 0) {
                        log(
                            props.taskId,
                            context?.user?.id,
                            LogType.PromptEvent,
                            {
                                code: text,
                                description: description,
                            }
                        );
                    }

                    let insertLine = 0;
                    let insertColumn = 1;

                    let curLineNumber = 0;
                    let curColumn = 0;

                    let highlightStartLine = 0;
                    let highlightStartColumn = 0;
                    let highlightEndLine = 0;
                    let highlightEndColumn = 0;

                    const curPos = props.editor.getPosition();
                    const curCodeLines = props.editor.getValue().split("\n");

                    if (curPos) {
                        curLineNumber = curPos.lineNumber;
                        curColumn = curPos.column;
                    }

                    let curLineText = curCodeLines[curLineNumber - 1];
                    let nextLineText =
                        curLineNumber < curCodeLines.length
                            ? curCodeLines[curLineNumber]
                            : null;

                    if (curColumn === 1) {
                        // at the beginning of a line
                        if (curLineText !== "") {
                            text += "\n";

                            highlightStartLine = curLineNumber;
                            highlightStartColumn = curColumn;

                            const textLines = text.split("\n");

                            highlightEndLine =
                                curLineNumber + textLines.length - 1;
                            highlightEndColumn = 1;
                        } else {
                            highlightStartLine = curLineNumber;
                            highlightStartColumn = curColumn;

                            highlightEndLine =
                                curLineNumber + text.split("\n").length;
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
                                curLineNumber + text.split("\n").length - 1;
                            highlightEndColumn =
                                textLines[textLines.length - 1].length + 1;
                        } else {
                            insertLine = curLineNumber + 1;
                            insertColumn = 1;

                            highlightStartLine = curLineNumber;
                            highlightStartColumn = curColumn;

                            highlightEndLine =
                                curLineNumber + text.split("\n").length;
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

                    const decoration = props.editor.deltaDecorations(
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
                                    className: "highlighted-code",
                                    isWholeLine: true,
                                    stickiness:
                                        monaco.editor.TrackedRangeStickiness
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
                        props.editor?.deltaDecorations(decoration, []);
                    }, 2500);

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

                    setDescription("");
                }
            })
            .catch((error) => {
                console.log("error: ", error);
            });
    };

    return (
        <div>
            <p>you can generate code using Codex:</p>
            <textarea
                className="codex-description-input"
                placeholder="Describe the behavior of the code..."
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
                type="block"
                onClick={() => {
                    generateCode();
                }}
            >
                Generate Code
            </Button>
        </div>
    );
};
