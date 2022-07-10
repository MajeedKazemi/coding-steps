import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";
import { IDocPageProps } from "./types";

export const VariablesDoc = (props: IDocPageProps) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            <h1 className="doc-title">Variables:</h1>

            <Accordion
                title="Variables"
                sectionId="var-intro"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
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
                sectionId="var-casting"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
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
                sectionId="var-get-type"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
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
                sectionId="str-quotes"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
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
                sectionId="var-case-sensitivity"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
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
