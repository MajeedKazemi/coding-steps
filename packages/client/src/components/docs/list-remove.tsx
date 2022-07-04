import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";
import { Code } from "../doc-inline-code";

export const ListRemoveItemDoc = ({ pageName = "list-remove-item" }) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            <h1 className="doc-title">Removing from Lists:</h1>

            <Accordion
                title="Remove Specified Item"
                section="remove-item"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>
                    The <Code>remove()</Code> method removes the specified item.
                </p>
                <Example
                    code={
                        'thislist = ["apple", "banana", "cherry"]\nthislist.remove("banana")\nprint(thislist)'
                    }
                    text='Remove "banana":'
                ></Example>
            </Accordion>

            <Accordion
                title="Remove Specified Index"
                section="remove-index"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>
                    The <Code>pop()</Code> method removes the specified index.
                </p>
                <Example
                    code={
                        'thislist = ["apple", "banana", "cherry"]\nthislist.pop(1)\nprint(thislist)'
                    }
                    text="Remove the second item:"
                ></Example>
                <p>
                    If you do not specify the index, the pop() method removes
                    the last item.
                </p>
                <Example
                    code={
                        'thislist = ["apple", "banana", "cherry"]\nthislist.pop()\nprint(thislist)'
                    }
                    text="Remove the last item:"
                ></Example>
            </Accordion>
        </Fragment>
    );
};
