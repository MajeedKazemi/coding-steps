import { useRef, useState, useEffect } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import styles from "./Editor.module.css";

export const Editor = () => {
    const [editor, setEditor] =
        useState<monaco.editor.IStandaloneCodeEditor | null>(null);
    const monacoEl = useRef(null);

    useEffect(() => {
        if (monacoEl && !editor) {
            setEditor(
                monaco.editor.create(monacoEl.current!, {
                    value: `print("hello world")`,
                    language: "python",
                })
            );
        }

        return () => editor?.dispose();
    }, [monacoEl.current]);

    return <div className={styles.editor} ref={monacoEl}></div>;
};
