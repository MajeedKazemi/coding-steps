import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";
import { Code } from "../doc-inline-code";

export const OutputVarDoc = ({ pageName = "output-variables" }) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            <h1 className="doc-title">Output Variables:</h1>

            <Accordion
                title="Output Variables"
                section="output-variables-intro"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>
                    The Python <Code>print</Code> statement is often used to
                    output variables.
                </p>
                <p>
                    To combine both text and a variable, Python uses the{" "}
                    <Code>+</Code> character:
                </p>
                <Example
                    code={'x = "awesome"\nprint("Python is " + x)'}
                ></Example>
            </Accordion>

            <Accordion
                title="Adding Variables Using + Operator"
                section="adding-vars-using-plus"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>
                    You can also use the <Code>+</Code> character to add a
                    variable to another variable:
                </p>
                <Example
                    code={
                        'x = "Python is "\ny = "awesome"\nz =  x + y\nprint(z)'
                    }
                ></Example>

                <p>
                    For numbers, the <Code>+</Code> character works as a
                    mathematical operator:
                </p>
                <Example code={"x = 5\ny = 10\nprint(x + y)"}></Example>

                <p>
                    If you try to combine a string and a number, Python will
                    give you an error:
                </p>
                <Example
                    code={'x = 5\ny = "John"\nprint(x + y)'}
                    isError
                ></Example>
            </Accordion>
        </Fragment>
    );
};
