import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";
import { Code } from "../doc-inline-code";

export const BooleansDoc = ({ pageName = "booleans" }) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            <h1 className="doc-title">Booleans:</h1>

            <Accordion
                title="Python Booleans"
                section="python-booleans"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>
                    Booleans represent one of two values: <Code>True</Code> or{" "}
                    <Code>False</Code>.
                </p>
                <p>
                    You can evaluate any expression in Python, and get one of
                    two answers, <Code>True</Code> or <Code>False</Code>.
                </p>
                <p>
                    When you compare two values, the expression is evaluated and
                    Python returns the Boolean answer:
                </p>
                <Example
                    code={"print(10 > 9)\nprint(10 == 9)\nprint(10 < 9)"}
                ></Example>
            </Accordion>

            <Accordion
                title="Booleans and if statement conditions"
                section="booleans-and-if-statements"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>
                    When you run a condition in an if statement, Python returns{" "}
                    <Code>True</Code> or <Code>False</Code>:
                </p>
                <Example
                    code={
                        'a = 200\nb = 33\n\nif b > a:\n\tprint("b is greater than a")\nelse:\n\tprint("b is not greater than a")'
                    }
                    text="Print a message based on whether the condition is True or False:"
                ></Example>
            </Accordion>

            <Accordion
                title="Evaluate Values and Variables"
                section="evaluate-values"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>
                    The <Code>bool()</Code> function allows you to evaluate any
                    value, and give you <Code>True</Code> or <Code>False</Code>{" "}
                    in return,
                </p>
                <Example
                    code={'print(bool("Hello"))\nprint(bool(15))'}
                    text="Evaluate a string and a number:"
                ></Example>
                <Example
                    code={
                        'x = "Hello"\ny = 15\n\nprint(bool(x))\nprint(bool(y))'
                    }
                    text="Evaluate two variables:"
                ></Example>
            </Accordion>

            <Accordion
                title="Most Values are True"
                section="most-values-true"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>
                    Almost any value is evaluated to <Code>True</Code> if it has
                    some sort of content.
                </p>
                <p>
                    Any string is <Code>True</Code>, except empty strings.
                </p>
                <p>
                    Any number is <Code>True</Code>, except <Code>0</Code>.
                </p>
                <p>
                    Any list, tuple, set, and dictionary are <Code>True</Code>,
                    except empty ones.
                </p>
                <Example
                    code={
                        'bool("abc")\nbool(123)\nbool(["apple", "cherry", "banana"])\n'
                    }
                    text="The following will return True:"
                ></Example>
            </Accordion>

            <Accordion
                title="Some Values are False"
                section="some-values-false"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>
                    In fact, there are not many values that evaluate to{" "}
                    <Code>False</Code>, except empty values, such as{" "}
                    <Code>{"( )"}</Code>, <Code>{"[ ]"}</Code>,{" "}
                    <Code>{"{ }"}</Code>, <Code>{'""'}</Code>, the number{" "}
                    <Code>0</Code>, and the value <Code>None</Code>. And of
                    course the value <Code>False</Code> evaluates to{" "}
                    <Code>False</Code>.
                </p>
                <Example
                    code={
                        'bool(False)\nbool(None)\nbool(0)\nbool("")\nbool(())\nbool([])\nbool({})'
                    }
                ></Example>

                <p>
                    One more value, or object in this case, evaluates to{" "}
                    <Code>False</Code>, and that is if you have an object that
                    is made from a class with a <Code>__len__</Code> function
                    that returns <Code>0</Code> or <Code>False</Code>:
                </p>
                <Example
                    code={
                        "class myclass():\n\tdef __len__(self):\n\t\treturn 0\n\nmyobj = myclass()\nprint(bool(myobj))"
                    }
                ></Example>
            </Accordion>

            <Accordion
                title="Functions can Return a Boolean"
                section="functions-return-booleans"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>You can create functions that returns a Boolean Value:</p>
                <Example
                    code={
                        "def myFunction() :\n\treturn True\n\nprint(myFunction())"
                    }
                    text="Print the answer of a function:"
                ></Example>

                <p>
                    You can execute code based on the Boolean answer of a
                    function:
                </p>
                <Example
                    code={
                        'def myFunction() :\n\treturn True\n\nif myFunction():\n\tprint("YES!")\nelse:\n\tprint("NO!")'
                    }
                    text='Print "YES!" if the function returns True, otherwise print "NO!":'
                ></Example>

                <p>
                    Python also has many built-in functions that return a
                    boolean value, like the <Code>isinstance()</Code> function,
                    which can be used to determine if an object is of a certain
                    data type:
                </p>
                <Example
                    code={"x = 200\nprint(isinstance(x, int))"}
                    text="Check if an object is an integer or not:"
                ></Example>
            </Accordion>
        </Fragment>
    );
};
