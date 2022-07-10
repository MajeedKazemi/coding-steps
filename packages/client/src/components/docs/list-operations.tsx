import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";
import { Message } from "../doc-message";
import { IDocPageProps } from "./types";

export const ListOperationsDoc = (props: IDocPageProps) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            <h1 className="doc-title">List Operations:</h1>

            <Accordion
                title="Access List Items"
                sectionId="access-list-items"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <h2></h2>
                <p>
                    List items are indexed and you can access them by referring
                    to the index number:
                </p>
                <Example
                    code={
                        'thislist = ["apple", "banana", "cherry"]\nprint(thislist[1])'
                    }
                    text="Print the second item of the list:"
                ></Example>
                <Message>
                    <p>Note: The first item has index 0.</p>
                </Message>
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
                        'thislist = ["apple", "banana", "cherry"]\nthislist[1] = "blackcurrant"\nprint(thislist)'
                    }
                    text="Change the second item:"
                ></Example>
            </Accordion>

            <Accordion
                title="Change a Range of Item Values"
                sectionId="change-range-val"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    To change the value of items within a specific range, define
                    a list with the new values, and refer to the range of index
                    numbers where you want to insert the new values:
                </p>
                <Example
                    code={
                        'thislist = ["apple", "banana", "cherry", "orange", "kiwi", "mango"]\nthislist[1:3] = ["blackcurrant", "watermelon"]\nprint(thislist)'
                    }
                    text='Change the values "banana" and "cherry" with the values "blackcurrant" and "watermelon":'
                ></Example>

                <p>
                    If you insert more items than you replace, the new items
                    will be inserted where you specified, and the remaining
                    items will move accordingly:
                </p>
                <Example
                    code={
                        'thislist = ["apple", "banana", "cherry"]\nthislist[1:2] = ["blackcurrant", "watermelon"]\nprint(thislist)'
                    }
                    text="Change the second value by replacing it with two new values:"
                ></Example>
                <Message>
                    <p>
                        Note: The length of the list will change when the number
                        of items inserted does not match the number of items
                        replaced.
                    </p>
                </Message>
                <p>
                    If you insert less items than you replace, the new items
                    will be inserted where you specified, and the remaining
                    items will move accordingly:
                </p>
                <Example
                    code={
                        'thislist = ["apple", "banana", "cherry"]\nthislist[1:3] = ["watermelon"]\nprint(thislist)'
                    }
                    text="Change the second and third value by replacing it with one value:"
                ></Example>
            </Accordion>
        </Fragment>
    );
};
