import * as monaco from "monaco-editor";
import { Fragment, useContext, useEffect, useRef, useState } from "react";

import { initializeLanguageClient } from "../api/intellisense";
import { executeCode, isConnected, onShellClose, onShellMessage, onShellOpen, sendShell } from "../api/python-shell";
import { AuthContext } from "../context";
import { EditorType } from "../utils/constants";
import { log, LogType } from "../utils/logger";
import { Codex } from "./codex";
import { Documentation } from "./documentation";

interface EditorProps {
    id: string;
    starterCode: string;
    editorType: EditorType;
    updateCode?: (code: string) => void;
}

export const Editor = (props: EditorProps) => {
    const { context } = useContext(AuthContext);

    const [editor, setEditor] =
        useState<monaco.editor.IStandaloneCodeEditor | null>(null);
    const monacoEl = useRef(null);
    const [output, setOutput] = useState<string[]>([]);
    const [terminalInput, setTerminalInput] = useState<string>("");
    const [connected, setConnected] = useState(isConnected);
    const [running, setRunning] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (monacoEl && !editor) {
            initializeLanguageClient();

            if (props.starterCode.length > 0) {
                log(
                    props.id,
                    context?.user?.id,
                    LogType.InitialCode,
                    props.starterCode
                );
            }

            const editor = monaco.editor.create(monacoEl.current!, {
                value: props.starterCode,
                language: "python",
                automaticLayout: true,
                fontSize: 18,
                lineHeight: 30,
                minimap: { enabled: false },
            });

            editor.onDidChangeModelContent((e) => {
                log(props.id, context?.user?.id, LogType.ReplayEvent, e);
            });

            editor.onDidPaste((e) => {
                console.log(e);
            });

            editor.addCommand(
                monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
                function () {
                    setOutput([]);
                    setRunning(true);
                    executeCode(editor?.getValue());
                }
            );

            setEditor(editor);

            if (props.updateCode) {
                props.updateCode(editor.getValue());
            }

            editor.onDidChangeModelContent(() => {
                if (props.updateCode) {
                    props.updateCode(editor.getValue());
                }
            });
        }

        return () => editor?.dispose();
    }, [monacoEl.current]);

    useEffect(() => {
        onShellMessage((data) => {
            if (data.type === "stdout") {
                if (data.out.split("\n").length > 0) {
                    setOutput([...output, ...data.out.split("\n")]);
                } else {
                    setOutput([...output, data.out]);
                }
            }

            if (data.type === "stderr") {
                setOutput([...output, data.err]);
            }

            if (data.type === "close") {
                setRunning(false);
            }
        });
    });

    useEffect(() => {
        onShellOpen(() => {
            setConnected(true);
        });

        onShellClose(() => {
            setConnected(false);
        });
    });

    return (
        <Fragment>
            <section className="task-workspace">
                <div className="editor" ref={monacoEl}></div>
                <button
                    disabled={running}
                    className={`run-button ${
                        running ? "run-btn-disabled" : ""
                    }`}
                    onClick={() => {
                        setOutput([]);
                        setRunning(true);
                        executeCode(editor?.getValue());
                    }}
                >
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
                </button>
                <div className="output">
                    {/* {props.editorType === EditorType.Copilot && (
                        <div>add copilot</div>
                    )} */}
                    {/* <span>{connected ? "connected" : "connecting"}</span> */}
                    {output.map((line, index) => (
                        <p key={"line-" + index}>{line}</p>
                    ))}
                    {running && (
                        <input
                            autoFocus
                            key={"input-" + output.length.toString()}
                            className="terminal-input"
                            ref={inputRef}
                            onKeyUp={(e) => {
                                if (e.key === "Enter") {
                                    sendShell(terminalInput);
                                    setOutput([...output, terminalInput]);
                                    setTerminalInput("");
                                }
                            }}
                            onChange={(event) => {
                                setTerminalInput(event.target.value);
                            }}
                        />
                    )}
                </div>
            </section>

            <section className="task-assists">
                <Documentation />
                {props.editorType === EditorType.Copilot ? (
                    <Codex editor={editor} />
                ) : null}
            </section>
        </Fragment>
    );
};
