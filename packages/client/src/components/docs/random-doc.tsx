import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";
import { Code } from "../doc-inline-code";
import { Message } from "../doc-message";
import { IDocPageProps } from "./types";

export const RandomDoc = (props: IDocPageProps) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            <h1 className="doc-title">Random Numbers:</h1>

            <Accordion
                title="Python Random choice() Method"
                sectionId="choice-method"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    The <Code>choice()</Code> method returns a randomly selected
                    element from the specified sequence.
                </p>
                <p>
                    The sequence can be a string, a range, a list, or any other kind of sequence.
                </p>
                <Message>
                    <p>Parameters: <Code>random.choice(list)</Code></p>
                </Message>
                <Example
                    code={
                        'import random\n\nmylist = ["apple", "banana", "cherry"]\n\nprint(random.choice(mylist)) # prints a random element from the list'
                    }
                    text="Return a random element from a list:"
                ></Example>
            </Accordion>
            <Accordion
                title="Python Random randint() Method"
                sectionId="randint-method"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    The <Code>randint()</Code> method returns a randomly generated number from the given range. Needs to be imported from the random module.
                </p>
                <Message>
                    <p>Parameters: <Code>random.randint(range_start, range_end)</Code></p>
                </Message>
                <Example
                    code={"import random\n\nprint(random.randint(3, 9)) # prints a random number between 3 and 9"}
                    text="Return a number between 3 and 9 (both included):"
                ></Example>
            </Accordion>
        </Fragment>
    );
};
