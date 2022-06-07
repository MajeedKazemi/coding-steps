import * as monaco from "monaco-editor";
import { useEffect, useRef, useState } from "react";

import styles from "./Editor.module.css";
import { initializeLanguageClient } from "./language";

export const Editor = () => {
    const [editor, setEditor] =
        useState<monaco.editor.IStandaloneCodeEditor | null>(null);
    const monacoEl = useRef(null);

    useEffect(() => {
        if (monacoEl && !editor) {
            initializeLanguageClient();

            setEditor(
                monaco.editor.create(monacoEl.current!, {
                    value: `print("hello world")`,
                    language: "python",
                    automaticLayout: true,
                    fontSize: 18,
                    lineHeight: 30,
                })
            );
        }

        return () => editor?.dispose();
    }, [monacoEl.current]);

    return <div className={styles.editor} ref={monacoEl}></div>;
};
