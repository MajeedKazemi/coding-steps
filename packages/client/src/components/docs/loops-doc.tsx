import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";
import { Code } from "../doc-inline-code";
import { Message } from "../doc-message";
import { IDocPageProps } from "./types";

export const LoopsDoc = (props: IDocPageProps) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            <h1 className="doc-title">Loops</h1>

            <Accordion
                title="Python Loops"
                sectionId="loops-intro"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>Python has two loop commands:</p>
                <ul>
                    <li>
                        <Code>while</Code> loops
                    </li>
                    <li>
                        <Code>for</Code> loops
                    </li>
                </ul>
            </Accordion>
            <Accordion
                title="While Loops"
                sectionId="while-loops"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    With the <Code>while</Code> loop we can execute a set of
                    statements as long as a condition is true.
                </p>
                <Example
                    code={"i = 1\nwhile i < 6:\n\tprint(i)\n\ti += 1"}
                    text="this program will print the numbers 1, 2, 3, 4, and 5"
                ></Example>
                <Message>
                    <p>
                        Note: remember to increment i, or else the loop will
                        continue forever.
                    </p>
                </Message>

            </Accordion>
            <Accordion
                title="For Loops"
                sectionId="for-loops"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    Executes a set of statements for each element in a sequence (like a <Code>range()</Code>, a <Code>list</Code>, or a <Code>string</Code>).
                </p>
                <Example
                    code={
                        'fruits = ["apple", "banana", "cherry"]\nfor x in fruits:\n\tprint(x)'
                    }
                    text="Print each fruit in a fruit list:"
                ></Example>
            </Accordion>
            
            <h2 className="doc-subtitle">Useful Tools For Loops</h2>
            <Accordion
                title= "The break Statement"
                sectionId="break-statement"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    With the break statement we can stop the loop before it has
                    looped through all the items:
                </p>
                <Example
                    code={
                        'fruits = ["apple", "banana", "cherry"]\nfor x in fruits:\n\tif x == "banana":\n\t\tbreak'
                    }
                    text='Exit the loop when x is "banana":'
                ></Example>
            </Accordion>
            <Accordion
                title="The continue Statement"
                sectionId="continue-statement"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    With the <Code>continue</Code> statement we can stop the
                    current iteration of the loop, and continue with the next:
                </p>
                <Example
                    code={
                        'fruits = ["apple", "banana", "cherry"]\nfor x in fruits:\n\tif x == "banana":\n\tcontinue\n\tprint(x)'
                    }
                    text="Do not print banana:"
                ></Example>
            </Accordion>
            <Accordion
                title="The range() Function"
                sectionId="range-function"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    To loop through a set of code a specified number of times,
                    we can use the <Code>range()</Code> function
                </p>
                <p>
                    The <Code>range()</Code> function returns a sequence of
                    numbers, starting from 0 by default, and increments by 1 (by
                    default), and ends at a specified number.
                </p>
                <Example
                    code={"for x in range(6):\n\tprint(x)"}
                    text="Using the range() function. This program will print the following numbers: 0, 1, 2, 3, 4, and 5."
                ></Example>
                <Message>
                    <p>
                        Note that <Code>range(6)</Code> is not the values of 0
                        to 6, but the values 0 to 5.
                    </p>
                </Message>
                <p>
                    The <Code>range()</Code> function defaults to 0 as a
                    starting value, however it is possible to specify the
                    starting value by adding a parameter:{" "}
                    <Code>range(2, 6)</Code>, which means values from 2 to 6
                    (but not including 6):
                </p>
                <Example
                    code={"for x in range(2, 6):\n\tprint(x)"}
                    text="Using the start parameter:"
                ></Example>
            </Accordion>
        </Fragment>
    );
};
