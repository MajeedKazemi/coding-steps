import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";
import { Code } from "../doc-inline-code";
import { Message } from "../doc-message";
import { IDocPageProps } from "./types";

export const ListAddItemDoc = (props: IDocPageProps) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            <h1 className="doc-title">Adding to Lists:</h1>

            <Accordion
                title="Append Items"
                sectionId="append-items"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    To add an item to the end of the list, use the{" "}
                    <Code>append()</Code> method:
                </p>
                <Example
                    code={
                        'thislist = ["apple", "banana", "cherry"]\nthislist.append("orange")\nprint(thislist)'
                    }
                    text="Using the append() method to append an item:"
                ></Example>
            </Accordion>

            <Accordion
                title="Insert Items"
                sectionId="insert-items"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    To insert a new list item, without replacing any of the
                    existing values, we can use the <Code>insert()</Code>{" "}
                    method.
                </p>
                <p>
                    The <Code>insert()</Code> method inserts an item at the
                    specified index:
                </p>
                <Example
                    code={
                        'thislist = ["apple", "banana", "cherry"]\nthislist.insert(2, "watermelon")\nprint(thislist)'
                    }
                    text='Insert "watermelon" as the third item:'
                ></Example>
                <Message>
                    <p>
                        Note: As a result of the examples above, the lists will
                        now contain 4 items.
                    </p>
                </Message>
            </Accordion>
        </Fragment>
    );
};
