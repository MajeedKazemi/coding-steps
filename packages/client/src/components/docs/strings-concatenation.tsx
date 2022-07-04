import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";

export const StringsConcatenationDoc = ({
    pageName = "strings-concatenation",
}) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            <h1 className="doc-title">String Concatenation:</h1>

            <Accordion
                title="String Concatenation"
                section="str-concat"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>
                    To concatenate, or combine, two strings you can use the +
                    operator.
                </p>
                <Example
                    code={'a = "Hello"\nb = "World"\nc = a + b\nprint(c)'}
                    text="Merge variable a with variable b into variable c:"
                ></Example>
                <Example
                    code={'a = "Hello"\nb = "World"\nc = a + " " + b\nprint(c)'}
                    text='To add a space between them, add a " ":'
                ></Example>
            </Accordion>
        </Fragment>
    );
};
