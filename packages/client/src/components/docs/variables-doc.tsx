import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";

export const VariablesDoc = ({ pageName = "variables" }) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            <h1 className="doc-title">Variables:</h1>

            <Accordion
                title="Variables"
                section="var-intro"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>Variables are containers for storing data values.</p>
                <h2>Creating Variables</h2>
                <p>Python has no command for declaring a variable.</p>
                <p>
                    A variable is created the moment you first assign a value to
                    it.
                </p>

                <Example
                    code={'x = 5\ny = "John"\nprint(x)\nprint(y)'}
                ></Example>

                <p>
                    Variables do not need to be declared with any particular
                    type, and can even change type after they have been set.
                </p>
                <Example
                    code={
                        'x = 4\t# x is of type int\nx = "Sally" # x is now of type str\nprint(x)'
                    }
                ></Example>
            </Accordion>

            <Accordion
                title="Casting"
                section="var-casting"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>
                    If you want to specify the data type of a variable, this can
                    be done with casting.
                </p>
                <Example
                    code={
                        'x = str(3)\t# x will be "3"\ny = int(3)    # y will be 3\nz = float(3)  # z will be 3.0'
                    }
                ></Example>
            </Accordion>

            <Accordion
                title="Get the Type"
                section="var-get-type"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>
                    You can get the data type of a variable with the type()
                    function.
                </p>

                <Example
                    code={'x = 5\ny = "John"\nprint(type(x))\nprint(type(y))'}
                ></Example>
            </Accordion>

            <Accordion
                title="Single or Double Quotes?"
                section="str-quotes"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>
                    String variables can be declared either by using single or
                    double quotes:
                </p>
                <Example
                    code={'x = "John"\n# is the same as\nx = "John"'}
                ></Example>
            </Accordion>

            <Accordion
                title="Case-Sensitive"
                section="var-case-sensitivity"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>Variable names are case-sensitive.</p>
                <Example
                    code={'a = 4\nA = "Sally"\n#A will not overwrite a'}
                    text={"This will create two variables:"}
                ></Example>
            </Accordion>
        </Fragment>
    );
};
