import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";
import { Code } from "../doc-inline-code";
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
                <Example
                    code={
                        'import random\n\nmylist = ["apple", "banana", "cherry"]\n\nprint(random.choice(mylist))'
                    }
                    text="Return a random element from a list:"
                ></Example>
            </Accordion>

            <Accordion
                title="Definition and Usage"
                sectionId="definition-usage"
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
                    The sequence can be a string, a range, a list, a tuple or
                    any other kind of sequence.
                </p>
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
                <Example
                    code={"import random\n\nprint(random.randint(3, 9))"}
                    text="Return a number between 3 and 9 (both included):"
                ></Example>

                <h2>Definition and Usage</h2>
                <p>
                    The <Code>randint()</Code> method returns an integer number
                    selected element from the specified range.
                </p>
            </Accordion>
        </Fragment>
    );
};
