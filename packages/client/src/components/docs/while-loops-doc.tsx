import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";
import { Code } from "../doc-inline-code";
import { Message } from "../doc-message";
import { IDocPageProps } from "./types";

export const WhileLoopsDoc = (props: IDocPageProps) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            <h1 className="doc-title">While Loops:</h1>

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
                <p>Python has two primitive loop commands:</p>
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
                title="The while Loop"
                sectionId="while-loop"
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
                <p>
                    The <Code>while</Code> loop requires relevant variables to
                    be ready, in this example we need to define an indexing
                    variable, <Code>i</Code>, which we set to 1.
                </p>
            </Accordion>
            <Accordion
                title="The break Statement"
                sectionId="break-statement"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    With the <Code>break</Code> statement we can stop the loop
                    even if the while condition is true:
                </p>
                <Example
                    code={
                        "i = 1\nwhile i < 6:\n\tprint(i)\n\tif i == 3:\n\t\tbreak\n\ti += 1"
                    }
                    text="Exit the loop when i is 3:"
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
                    With the continue statement we can stop the current
                    iteration, and continue with the next:
                </p>
                <Example
                    code={
                        "i = 1\nwhile i < 6:\n\tprint(i)\n\tif i == 3:\n\t\tcontinue\n\ti += 1"
                    }
                    text="Continue to the next iteration if i is 3:"
                ></Example>
            </Accordion>
        </Fragment>
    );
};
