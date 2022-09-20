import * as monaco from "monaco-editor";
import React, { useEffect, useRef } from "react";

interface IProps {
    code: string;
}

export const CodeViewer = (props: IProps) => {
    const codeEl = useRef(null);

    useEffect(() => {
        if (codeEl.current) {
            monaco.editor.colorizeElement(codeEl.current as HTMLElement, {
                theme: "vs",
                mimeType: "python",
                tabSize: 4,
            });
        }
    }, [codeEl]);

    return (
        <div>
            <div ref={codeEl} className="analysis-code-viewer">
                {props.code}
            </div>
        </div>
    );
};
