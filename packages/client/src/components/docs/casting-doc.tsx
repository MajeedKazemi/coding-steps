import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";
import { Code } from "../doc-inline-code";

export const CastingDoc = ({ pageName = "casting" }) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            <h1 className="doc-title">Casting Variables:</h1>

            <Accordion
                title="Specify a Variable Type"
                section="specify-var-type"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>
                    There may be times when you want to specify a type on to a
                    variable. This can be done with casting. Python is an
                    object-orientated language, and as such it uses classes to
                    define data types, including its primitive types.
                </p>
                <p>
                    Casting in python is therefore done using constructor
                    functions:
                </p>
                <ul className="list-disc">
                    <li>
                        <Code>int()</Code> - constructs an integer number from
                        an integer literal, a float literal (by removing all
                        decimals), or a string literal (providing the string
                        represents a whole number)
                    </li>
                    <li>
                        <Code>float()</Code> - constructs a float number from an
                        integer literal, a float literal or a string literal
                        (providing the string represents a float or an integer)
                    </li>
                    <li>
                        <Code>str()</Code> - constructs a string from a wide
                        variety of data types, including strings, integer
                        literals and float literals
                    </li>
                </ul>
                <Example
                    code={
                        'x = int(1)   # x will be 1\ny = int(2.8) # y will be 2\nz = int("3") # z will be 3'
                    }
                    text="Integers:"
                ></Example>
                <Example
                    code={
                        'x = float(1)     # x will be 1.0\ny = float(2.8)   # y will be 2.8\nz = float("3")   # z will be 3.0\nw = float("4.2") # w will be 4.2'
                    }
                    text="Floats:"
                ></Example>
                <Example
                    code={
                        'x = str("s1") # x will be "s1"\ny = str(2)    # y will be "2"\nz = str(3.0)  # z will be "3.0"'
                    }
                    text="Strings:"
                ></Example>
            </Accordion>
        </Fragment>
    );
};
