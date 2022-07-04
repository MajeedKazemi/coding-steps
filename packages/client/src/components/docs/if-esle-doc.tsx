import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";
import { Code } from "../doc-inline-code";

export const IfElseDoc = ({ pageName = "if-else" }) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            <h1 className="doc-title">Conditional Statements:</h1>

            <Accordion
                title="Python Conditions and If statements"
                section="if-conditions"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>
                    Python supports the usual logical conditions from
                    mathematics:
                </p>
                <ul>
                    <li>
                        Equals: <Code>{"a == b"}</Code>
                    </li>
                    <li>
                        Not equals: <Code>{"a != b"}</Code>
                    </li>
                    <li>
                        Less than: <Code>{"a < b"}</Code>
                    </li>
                    <li>
                        Less than or equal: <Code>{"a <= b"}</Code>
                    </li>
                    <li>
                        Greater than: <Code>{"a > b"}</Code>
                    </li>
                    <li>
                        Greater than or equal: <Code>{"a >= b"}</Code>
                    </li>
                </ul>
                <p>
                    {
                        'These conditions can be used in several ways, most commonly in "if statements" and loops.'
                    }
                </p>
                <p>{'An "if statement" is written by using the if keyword.'}</p>
                <Example
                    code={
                        'a = 33\nb = 200\nif b > a:\n\tprint("b is greater than a")'
                    }
                ></Example>
                <p>
                    In this example we use two variables, <Code>a</Code> and{" "}
                    <Code>b</Code>, which are used as part of the if statement
                    to test whether <Code>b</Code> is greater than{" "}
                    <Code>a</Code>. As <Code>a</Code> is <Code>33</Code>, and{" "}
                    <Code>b</Code> is <Code>200</Code>, we know that 200 is
                    greater than 33, and so we print to screen that{" "}
                    {'"b is greater than a"'}.
                </p>
            </Accordion>

            <Accordion
                title="Indentations"
                section="indentations"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>
                    Python relies on indentation (whitespace at the beginning of
                    a line) to define scope in the code. Other programming
                    languages often use curly-brackets for this purpose.
                </p>
                <Example
                    code={
                        'a = 33\nb = 200\nif b > a:\nprint("b is greater than a") # you will get an error'
                    }
                    text="If statement, without indentation (will raise an error):"
                    isError
                ></Example>
            </Accordion>

            <Accordion
                title="Elif (else if)"
                section="elif"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>
                    {
                        'The elif keyword is pythons way of saying "if the previous conditions were not true, then try this condition".'
                    }
                </p>
                <Example
                    code={
                        'a = 33\nb = 33\nif b > a:\n\tprint("b is greater than a")\nelif a == b:\n\tprint("a and b are equal")'
                    }
                ></Example>
                <p>
                    In this example <Code>a</Code> is equal to <Code>b</Code>,
                    so the first condition is not true, but the{" "}
                    <Code>elif</Code> condition is true, so we print to screen
                    that {'"a and b are equal"'}.
                </p>
            </Accordion>

            <Accordion
                title="Else"
                section="else"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>
                    The <Code>else</Code> keyword catches anything which{" "}
                    {"isn't"} caught by the preceding conditions.
                </p>
                <Example
                    code={
                        'a = 200\nb = 33\nif b > a:\n\tprint("b is greater than a")\nelif a == b:\n\tprint("a and b are equal")\nelse:\n\tprint("a is greater than b")'
                    }
                ></Example>
                <p>
                    In this example <Code>a</Code> is greater than{" "}
                    <Code>b</Code>, so the first condition is not true, also the{" "}
                    <Code>elif</Code> condition is not true, so we go to the{" "}
                    <Code>else</Code> condition and print to screen that{" "}
                    {'"a is greater than b"'}.
                </p>
                <p>
                    You can also have an <Code>else</Code> without the{" "}
                    <Code>elif</Code>:
                </p>
                <Example
                    code={
                        'a = 200\nb = 33\nif b > a:\n\tprint("b is greater than a")\nelse:\n\tprint("b is not greater than a")'
                    }
                ></Example>
            </Accordion>

            <Accordion
                title="And"
                section="and"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>
                    The <Code>and</Code> keyword is a logical operator, and is
                    used to combine conditional statements:
                </p>
                <Example
                    code={
                        'a = 200\nb = 33\nc = 500\nif a > b and c > a:\n\tprint("Both conditions are True")'
                    }
                    text="Test if a is greater than b, AND if c is greater than a:"
                ></Example>
            </Accordion>

            <Accordion
                title="Or"
                section="or"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>
                    The <Code>or</Code> keyword is a logical operator, and is
                    used to combine conditional statements:
                </p>
                <Example
                    code={
                        'a = 200\nb = 33\nc = 500\nif a > b or a > c:\n\tprint("At least one of the conditions is True")'
                    }
                    text="Test if a is greater than b, OR if a is greater than c:"
                ></Example>
            </Accordion>

            <Accordion
                title="Nested If"
                section="nested-if"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>
                    You can have <Code>if</Code> statements inside{" "}
                    <Code>if</Code> statements, this is called nested{" "}
                    <Code>if</Code> statements.
                </p>
                <Example
                    code={
                        'x = 41\n\nif x > 10:\n\tprint("Above ten,")\n\tif x > 20:\n\t\tprint("and also above 20!")\n\telse:\n\t\tprint("but not above 20.")'
                    }
                ></Example>
            </Accordion>

            <Accordion
                title="The pass Statement"
                section="pass"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>
                    <Code>if</Code> statements cannot be empty, but if you for
                    some reason have an <Code>if</Code> statement with no
                    content, put in the <Code>pass</Code> statement to avoid
                    getting an error.
                </p>
                <Example
                    code={"a = 33\nb = 200\n\nif b > a:\n\tpass"}
                ></Example>
            </Accordion>
        </Fragment>
    );
};
