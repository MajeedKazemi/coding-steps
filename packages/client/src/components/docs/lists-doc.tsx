import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";
import { Code } from "../doc-inline-code";
import { Message } from "../doc-message";
import { IDocPageProps } from "./types";

export const ListsDoc = (props: IDocPageProps) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            <h1 className="doc-title">Lists:</h1>

            <Accordion
                title="Introduction to Lists"
                sectionId="lists-intro"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    Lists are used to store multiple items in a single variable.
                </p>
                <p>Lists are created using square brackets<Code>[]</Code>:</p>
                <Example
                    code={
                        'thislist = ["apple", "banana", "cherry"]\nprint(thislist) #outputs ["apple", "banana", "cherry"]'
                    }
                    text="Create a List:"
                ></Example>
            </Accordion>
            <Accordion
                title="Adding Items To The End Of A List"
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
                        'thislist = ["apple", "banana", "cherry"]\nthislist.append("orange")\nprint(thislist) #outputs ["apple", "banana", "cherry", "orange"]'
                    }
                    text="Using the append() method to append an item:"
                ></Example>
            </Accordion>
            <Accordion
                title="Inserting Items Into A Specific Position In A List"
                sectionId="insert-items"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    To insert a new list item, we can use the <Code>insert()</Code>{" "}
                    method.
                </p>
                <p>
                    The <Code>insert()</Code> method inserts an item at the
                    specified index:
                </p>
                <Example
                    code={
                        'thislist = ["apple", "banana", "cherry"]\nthislist.insert(2, "watermelon")\nprint(thislist) #outputs ["apple", "banana", "watermelon", "cherry"]'
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

            <Accordion
                title="Accessing List Items"
                sectionId="accessing-list-items"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    List items are indexed, the first item has index
                    <Code>[0]</Code>, the second item has index <Code>[1]</Code>
                    etc.
                </p>
                <p>You can access items in a list by referring to the index number:</p>
                <Example
                    code={
                        'thislist = ["apple", "banana", "cherry"]\nprint(thislist[1]) #outputs "banana"'
                    }
                    text="Print the second item of the list:"
                ></Example>
            </Accordion>
            <Accordion
                title="Change List Item Value"
                sectionId="change-list-items-val"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    To change the value of a specific item, refer to the index
                    number:
                </p>
                <Example
                    code={
                        'thislist = ["apple", "banana", "cherry"]\nthislist[1] = "blackcurrant"\nprint(thislist) #outputs ["apple", "blackcurrant", "cherry"]'
                    }
                    text="Change the second item:"
                ></Example>
            </Accordion>
        </Fragment>
    );
};
