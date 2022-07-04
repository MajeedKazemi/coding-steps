import * as monaco from "monaco-editor";
import { useCallback, useEffect, useRef, useState } from "react";

interface IExampleProps {
    code: string;
    isError?: boolean;
    text?: string;
}

export const Example = (props: IExampleProps) => {
    const [editor, setEditor] =
        useState<monaco.editor.IStandaloneCodeEditor | null>(null);
    const monacoEl = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log(monacoEl);

        if (monacoEl.current) {
            monaco.editor.colorizeElement(monacoEl.current as HTMLElement, {
                theme: "vs",
                mimeType: "python",
                tabSize: 4,
            });
        }
    }, [monacoEl]);

    return (
        <div
            className={`example-container ${
                props.isError ? "example-error" : ""
            }`}
        >
            <h3 className="text-xl font-bold">Example</h3>
            {props.text && <p>{props.text}</p>}

            <div ref={monacoEl} className="example-editor">
                {props.code}
            </div>
        </div>
    );
};
