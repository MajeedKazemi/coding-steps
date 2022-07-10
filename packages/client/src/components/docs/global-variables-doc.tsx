import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";
import { Code } from "../doc-inline-code";
import { IDocPageProps } from "./types";

export const GlobalVariablesDoc = (props: IDocPageProps) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            <h1 className="doc-title">Global Variables:</h1>

            <Accordion
                title="Global Variables"
                sectionId="global-variables"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    Variables that are created outside of a function (as in all
                    of the examples above) are known as global variables.
                </p>
                <p>
                    Global variables can be used by everyone, both inside of
                    functions and outside.
                </p>
                <Example
                    code={
                        'x = "awesome"\n\ndef myfunc():\n\tprint("Python is " + x)\n\nmyfunc()'
                    }
                    text="Create a variable outside of a function, and use it inside the function"
                ></Example>

                <p>
                    If you create a variable with the same name inside a
                    function, this variable will be local, and can only be used
                    inside the function. The global variable with the same name
                    will remain as it was, global and with the original value.
                </p>
                <Example
                    code={
                        'x = "awesome"\n\ndef myfunc():\n\tx = "fantastic"\n\tprint("Python is " + x)\n\nmyfunc()\n\nprint("Python is " + x)'
                    }
                    text="Create a variable inside a function, with the same name as the global variable"
                ></Example>
            </Accordion>

            <Accordion
                title="The global Keyword"
                sectionId="global-keyword"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    Normally, when you create a variable inside a function, that
                    variable is local, and can only be used inside that
                    function.
                </p>
                <p>
                    To create a global variable inside a function, you can use
                    the global keyword.
                </p>
                <Example
                    code={
                        'def myfunc():\n\tglobal x\n\tx = "fantastic"\n\nmyfunc()\n\nprint("Python is " + x)'
                    }
                    text="If you use the global keyword, the variable belongs to the global scope:"
                ></Example>

                <p>
                    Also, use the <Code>global</Code> keyword if you want to
                    change a global variable inside a function.
                </p>

                <Example
                    code={
                        'x = "awesome"\n\ndef myfunc():\n\tglobal x\n\tx = "fantastic"\n\nmyfunc()\n\nprint("Python is " + x)'
                    }
                    text="To change the value of a global variable inside a function, refer to the variable by using the global keyword:"
                ></Example>
            </Accordion>
        </Fragment>
    );
};
