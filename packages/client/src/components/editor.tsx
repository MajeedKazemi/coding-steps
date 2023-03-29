import * as monaco from "monaco-editor";
import {
    forwardRef,
    Fragment,
    useContext,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";

import { apiGetSavedUserCode, apiSaveUserCode, logError } from "../api/api";
import {
    initLanguageClient,
    retryOpeningLanguageClient,
    stopLanguageClient,
} from "../api/intellisense";
import { AuthContext, SocketContext } from "../context";
import { log, LogType, RunEventType } from "../utils/logger";

interface EditorProps {
    taskId: string;
    starterCode: string;
    showCodex: boolean;
    updateCode?: (code: string) => void;
}

export const Editor = forwardRef((props: EditorProps, ref) => {
    const { context } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);

    const [runId, setRunId] = useState(0);

    const [editor, setEditor] =
        useState<monaco.editor.IStandaloneCodeEditor | null>(null);
    const monacoEl = useRef(null);
    const [output, setOutput] = useState<
        Array<{ type: "error" | "output" | "input"; line: string }>
    >([]);
    const [terminalInput, setTerminalInput] = useState<string>("");
    const [running, setRunning] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [lastEditedAt, setLastEditedAt] = useState<Date | null>(null);
    const [saved, setSaved] = useState(true);
    const [canReset, setCanReset] = useState(false);

    useImperativeHandle(ref, () => ({
        setCode(code: string) {
            if (editor) {
                editor.setValue(code);
            }
        },
    }));

    useEffect(() => {
        if (monacoEl && !editor) {
            apiGetSavedUserCode(context?.token, props.taskId)
                .then((response) => {
                    if (response.ok) {
                        response.json().then((data) => {
                            const savedCode = data.savedCode
                                ? data.savedCode
                                : "";

                            initLanguageClient();
                            // stopLanguageClient(); // could be used to call .connect() for each coding task

                            if (props.starterCode.length > 0) {
                                log(
                                    props.taskId,
                                    context?.user?.id,
                                    LogType.InitialCode,
                                    props.starterCode
                                );
                            }

                            const editor = monaco.editor.create(
                                monacoEl.current!,
                                {
                                    value: savedCode
                                        ? savedCode
                                        : props.starterCode,
                                    language: "python",
                                    automaticLayout: true,
                                    fontSize: 15,
                                    lineHeight: 25,
                                    minimap: { enabled: false },
                                    wordWrap: "on",
                                    wrappingIndent: "indent",
                                }
                            );

                            editor.onDidChangeModelContent((e) => {
                                log(
                                    props.taskId,
                                    context?.user?.id,
                                    LogType.ReplayEvent,
                                    e
                                );

                                retryOpeningLanguageClient();

                                setLastEditedAt(new Date());
                                setSaved(false);

                                if (editor.getValue() !== props.starterCode) {
                                    setCanReset(true);
                                } else {
                                    setCanReset(false);
                                }

                                if (props.updateCode) {
                                    props.updateCode(editor.getValue());
                                }
                            });

                            editor.onDidPaste((e) => {
                                console.log(e);
                            });

                            setEditor(editor);

                            if (props.updateCode) {
                                props.updateCode(editor.getValue());
                            }
                        });
                    }
                })
                .catch((error) => {
                    logError(error.toString());
                });
        }

        return () => editor?.dispose();
    }, [monacoEl.current]);

    useEffect(() => {
        socket?.on("python", (data: any) => {
            if (data.type === "stdout") {
                if (data.out.split("\n").length > 0) {
                    setOutput([
                        ...output,
                        ...data.out.split("\n").map((i: string) => {
                            return {
                                type: "output",
                                line: i,
                            };
                        }),
                    ]);
                } else {
                    setOutput([
                        ...output,
                        {
                            type: "output",
                            line: data.out,
                        },
                    ]);
                }
                log(props.taskId, context?.user?.id, LogType.RunEvent, {
                    type: RunEventType.Output,
                    output: data.out,
                    runId: runId,
                });
            }
            if (data.type === "stderr") {
                setOutput([
                    ...output,
                    {
                        type: "error",
                        line: data.err,
                    },
                ]);
                log(props.taskId, context?.user?.id, LogType.RunEvent, {
                    type: RunEventType.Error,
                    error: data.err,
                    runId: runId,
                });
            }
            if (data.type === "close") {
                setRunning(false);
                setRunId(runId + 1);
                log(props.taskId, context?.user?.id, LogType.RunEvent, {
                    type: RunEventType.Stop,
                    runId: runId,
                });
            }
        });
    }, [output, runId]);

    useEffect(() => {
        return () => {
            stopLanguageClient();
            // stopPythonShell();
        };
    }, []);

    const handleClickRun = () => {
        if (!running) {
            socket?.emit("python", {
                type: "run",
                code: editor?.getValue(),
                from: socket.id,
                userId: context?.user?.id,
            });

            setOutput([]);
            setRunning(true);

            log(props.taskId, context?.user?.id, LogType.RunEvent, {
                type: RunEventType.Start,
                code: editor?.getValue(),
                runId: runId,
            });
        } else {
            socket?.emit("python", {
                type: "stop",
                from: socket.id,
                userId: context?.user?.id,
            });

            setRunning(false);
            editor?.focus();
        }
    };

    const handleClickReset = () => {
        editor?.setValue(props.starterCode);
    };

    const handleClickUndo = () => {
        editor?.trigger("myapp", "undo", {});
    };

    const handleClickSave = () => {
        const code = editor?.getValue();

        if (code) {
            apiSaveUserCode(context?.token, props.taskId, code);
        }
    };

    useEffect(() => {
        const id = setInterval(() => {
            if (lastEditedAt && lastEditedAt.getTime() + 5000 < Date.now()) {
                handleClickSave();
                setSaved(true);
            }
        }, 1000);

        return () => {
            clearInterval(id);
        };
    }, [lastEditedAt]);

    return (
        <Fragment>
            <section className="task-workspace">
                <div className="editor" ref={monacoEl}></div>
                <div className="editor-buttons-container">
                    <button
                        className={`editor-button ${
                            running ? "stop-button" : "run-button"
                        }`}
                        onClick={handleClickRun}
                    >
                        {" "}
                        {!running ? (
                            <Fragment>
                                {" "}
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    color="currentColor"
                                    stroke="none"
                                    strokeWidth="0"
                                    fill="currentColor"
                                    className="play-icon"
                                >
                                    <path d="M20.2253 11.5642C20.5651 11.7554 20.5651 12.2446 20.2253 12.4358L5.74513 20.5809C5.41183 20.7683 5 20.5275 5 20.1451L5 3.85492C5 3.47251 5.41183 3.23165 5.74513 3.41914L20.2253 11.5642Z"></path>
                                </svg>
                                Run
                            </Fragment>
                        ) : (
                            <Fragment>Stop</Fragment>
                        )}
                    </button>

                    <div className="quick-editing-buttons-container">
                        <button
                            className={`editor-button ${
                                saved ? "editing-btn-disabled" : "editing-btn"
                            }`}
                            disabled={saved}
                            onClick={handleClickSave}
                        >
                            {saved ? "Code Saved" : "Save Code"}
                        </button>
                        <button
                            className={`editor-button ${
                                canReset
                                    ? "editing-btn"
                                    : "editing-btn-disabled"
                            }`}
                            disabled={!canReset}
                            onClick={handleClickReset}
                        >
                            Reset
                        </button>
                        <button
                            className="editor-button editing-btn"
                            onClick={handleClickUndo}
                        >
                            Undo
                        </button>
                    </div>
                </div>
                <div className="output">
                    {output.map((i, index) => (
                        <p
                            className={
                                i.type === "error" ? `console-output-error` : ""
                            }
                            key={"line-" + index}
                        >
                            {i.line}
                        </p>
                    ))}
                    {running && (
                        <input
                            autoFocus
                            key={"input-" + output.length.toString()}
                            className="terminal-input"
                            ref={inputRef}
                            onKeyUp={(e) => {
                                if (e.key === "Enter") {
                                    socket?.emit("python", {
                                        type: "stdin",
                                        value: terminalInput,
                                        from: socket.id,
                                        userId: context?.user?.id,
                                    });

                                    setOutput([
                                        ...output,
                                        {
                                            type: "input",
                                            line: terminalInput,
                                        },
                                    ]);
                                    setTerminalInput("");
                                    log(
                                        props.taskId,
                                        context?.user?.id,
                                        LogType.RunEvent,
                                        {
                                            type: RunEventType.Input,
                                            runId: runId,
                                            input: terminalInput,
                                        }
                                    );
                                }
                            }}
                            onChange={(event) => {
                                setTerminalInput(event.target.value);
                            }}
                        />
                    )}
                </div>
            </section>
        </Fragment>
    );
});
