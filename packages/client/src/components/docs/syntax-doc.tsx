import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";
import { Code } from "../doc-inline-code";

export const SyntaxDoc = ({ pageName = "syntax" }) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            <h1 className="doc-title">Syntax:</h1>

            <Accordion
                title="Python Quick Start"
                section="start-hello-world"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>{"Let's write our first Python program:"}</p>
                <Example code={'print("Hello, World!")'}></Example>
            </Accordion>

            <Accordion
                title="Python Indentation"
                section="indentation-intro"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>
                    Indentation refers to the spaces at the beginning of a code
                    line.
                </p>
                <p>
                    Where in other programming languages the indentation in code
                    is for readability only, the indentation in Python is very
                    important.
                </p>
                <p>Python uses indentation to indicate a block of code.</p>
                <Example
                    code={'if 5 > 2:\n\tprint("Five is greater than two!")'}
                ></Example>

                <p>
                    Python will give you an error if you skip the indentation:
                </p>
                <Example
                    code={'if 5 > 2:\nprint("Five is greater than two!")'}
                    isError
                ></Example>

                <p>
                    The number of spaces is up to you as a programmer, but it
                    has to be at least one.
                </p>
                <Example
                    code={
                        'if 5 > 2:\n  print("Five is greater than two!")\nif 5 > 2:\n\t\tprint("Five is greater than two!")'
                    }
                ></Example>
                <p>
                    You have to use the same number of spaces in the same block
                    of code, otherwise Python will give you an error:
                </p>
                <Example
                    code={
                        'if 5 > 2:\n  print("Five is greater than two!")\n     print("Five is greater than two!")'
                    }
                    isError
                    text={"Syntax Error:"}
                ></Example>
            </Accordion>

            <Accordion
                title="Python Variables"
                section="quick-variables"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>
                    In Python, variables are created when you assign a value to
                    it:
                </p>
                <Example
                    code={'x = 5\ny = "Hello, World!"'}
                    text={"Variables in Python:"}
                ></Example>

                <p>Python has no command for declaring a variable.</p>
                <p>
                    {/* You will learn more about variables in the{" "}
                    <Link href="/variables">Python Variables</Link> chapter. */}
                </p>
            </Accordion>

            <Accordion
                title="Comments"
                section="quick-comments"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>
                    Python has commenting capability for the purpose of in-code
                    documentation.
                </p>
                <p>
                    Comments start with a <Code>#</Code>, and Python will render
                    the rest of the line as a comment:
                </p>

                <Example
                    code={'# This is a comment.\nprint("Hello, World!")'}
                    text={"Comments in Python:"}
                ></Example>
            </Accordion>
        </Fragment>
    );
};
