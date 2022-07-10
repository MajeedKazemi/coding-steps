import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";
import { Code } from "../doc-inline-code";
import { Message } from "../doc-message";
import { IDocPageProps } from "./types";

export const NumbersDoc = (props: IDocPageProps) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            <h1 className="doc-title">Numbers:</h1>

            <Accordion
                title="Python Numbers"
                sectionId="numbers-intro"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>There are three numeric types in Python:</p>
                <ul>
                    <li>
                        <Code>int</Code>
                    </li>
                    <li>
                        <Code>float</Code>
                    </li>
                    <li>
                        <Code>complex</Code>
                    </li>
                </ul>
                <p>
                    Variables of numeric types are created when you assign a
                    value to them:
                </p>
                <Example
                    code={
                        "x = 1    # int\ny = 2.8  # float\nz = 1j   # complex"
                    }
                ></Example>

                <p>
                    To verify the type of any object in Python, use the{" "}
                    <Code>type()</Code> function:
                </p>
                <Example
                    code={"print(type(x))\nprint(type(y))\nprint(type(z))"}
                ></Example>
            </Accordion>

            <Accordion
                title="Integer (int)"
                sectionId="integer"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    Int, or integer, is a whole number, positive or negative,
                    without decimals, of unlimited length.
                </p>
                <Example
                    code={
                        "x = 1\ny = 35656222554887711\nz = -3255522\n\nprint(type(x))\nprint(type(y))\nprint(type(z))"
                    }
                    text="Integers:"
                ></Example>
            </Accordion>

            <Accordion
                title="Float"
                sectionId="float"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <Example
                    code={
                        "x = 1.10\ny = 1.0\nz = -35.59\n\nprint(type(x))\nprint(type(y))\nprint(type(z))"
                    }
                    text="Floats:"
                ></Example>

                <p>
                    Float can also be scientific numbers with an <Code>e</Code>{" "}
                    to indicate the power of 10.
                </p>
                <Example
                    code={
                        "x = 35e3\ny = 12E4\nz = -87.7e100\n\nprint(type(x))\nprint(type(y))\nprint(type(z))"
                    }
                    text="Floats:"
                ></Example>
            </Accordion>

            <Accordion
                title="Complex"
                sectionId="complex"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    Complex numbers are written with a <Code>j</Code> as the
                    imaginary part.
                </p>
                <Example
                    code={
                        "x = 3+5j\ny = 5j\nz = -5j\n\nprint(type(x))\nprint(type(y))\nprint(type(z))"
                    }
                    text="Complex:"
                ></Example>
            </Accordion>

            <Accordion
                title="Type Conversion"
                sectionId="type-conversion"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    You can convert from one type to another with the int(),
                    float(), and complex() methods:
                </p>
                <Example
                    code={
                        "x = 1    # int\ny = 2.8  # float\nz = 1j   # complex\n\n#convert from int to float:\na = float(x)\n\n#convert from float to int:\nb = int(y)\n\n#convert from int to complex:\nc = complex(x)\n\nprint(a)\nprint(b)\nprint(c)\n\nprint(type(a))\nprint(type(b))\nprint(type(c))"
                    }
                    text="Convert from one type to another:"
                ></Example>
                <Message>
                    <p>
                        Note: You cannot convert complex numbers into another
                        number type.
                    </p>
                </Message>
            </Accordion>

            <Accordion
                title="Random Number"
                sectionId="random-number"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    Python does not have a <Code>random()</Code> function to
                    make a random number, but Python has a built-in module
                    called <Code>random</Code> that can be used to make random
                    numbers:
                </p>
                <Example
                    code={"import random\n\nprint(random.randrange(1, 10))"}
                    text="Import the random module, and display a random number between 1 and 9:"
                ></Example>
            </Accordion>
        </Fragment>
    );
};
