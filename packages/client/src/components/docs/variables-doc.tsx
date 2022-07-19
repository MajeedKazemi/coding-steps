import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";
import { Code } from "../doc-inline-code";
import { Message } from "../doc-message";
import { IDocPageProps } from "./types";

export const VariablesDoc = (props: IDocPageProps) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            <h1 className="doc-title">Variables:</h1>

            <Accordion
                title="Creating Variables"
                sectionId="creating-variables"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>Variables are containers for storing data values.</p>
                <p>
                    A variable is created the moment you first assign a value to
                    it.
                </p>
                <p>
                    You can assign a value by using the <Code>=</Code> operator
                </p>

                <Example
                    code={'x = 5\ny = "John"\nprint(x)\nprint(y)'}
                ></Example>

                
                <Message>
                    <p>Variables names are case-sensitive.</p>
                    <p>Python will interpret <Code>Name</Code> and <Code>name</Code> as different variables</p>
                </Message>
            </Accordion>
            <Accordion
                title="Updating Variables"
                sectionId="updating-variables"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>You can change the value of a variable by using the <Code>=</Code> operator</p>
                <p>
                    Variables can change types after they have been set.
                </p>
                <Example
                    code={
                        'x = 4\t# x is of type int\nx = "Sally" # x is now of type str\nprint(x)'
                    }
                ></Example>
            </Accordion>

            <h2 className="doc-subtitle">Shorcuts for Updating Variables</h2>
            <Accordion
                title="+="
                sectionId="+="
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>If you have a variable and you want to update it's value based on it's previous value, normally it would look like this.</p>
                <Example
                    code={
                        'x = 4\nx = x + 1\nprint(x) # prints 5'
                    }
                ></Example>
                <p>A faster way of doing this exact same operation would be using the <Code>+=</Code> operator like this.</p>
                <Example
                code={
                    'x = 4\nx += 1\nprint(x) # prints 5'
                }></Example>
            </Accordion>
        </Fragment>
    );
};
