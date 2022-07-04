import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";
import { Code } from "../doc-inline-code";

export const ListLoopThroughDoc = ({ pageName = "list-loop-through" }) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            <h1 className="doc-title">Looping Through Lists:</h1>

            <Accordion
                title="Loop Through a List"
                section="loop-through-list"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>
                    You can loop through the list items by using a{" "}
                    <Code>for</Code> loop:
                </p>
                <Example
                    code={
                        'thislist = ["apple", "banana", "cherry"]\nfor x in thislist:\n\tprint(x)'
                    }
                    text="Print all items in the list, one by one:"
                ></Example>
                <p>
                    Learn more about for loops in our Python For Loops Chapter.
                </p>
            </Accordion>

            <Accordion
                title="Loop Through the Index Numbers"
                section="loop-through-index-numbers"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>
                    You can also loop through the list items by referring to
                    their index number.
                </p>
                <p>
                    Use the <Code>range()</Code> and <Code>len()</Code>{" "}
                    functions to create a suitable iterable.
                </p>
                <Example
                    code={
                        'thislist = ["apple", "banana", "cherry"]\nfor i in range(len(thislist)):\n\tprint(thislist[i])'
                    }
                    text="Print all items by referring to their index number:"
                ></Example>
                <p>
                    The iterable created in the example above is{" "}
                    <Code>[0, 1, 2]</Code>.
                </p>
            </Accordion>

            <Accordion
                title="Using a While Loop"
                section="using-while-loop"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>
                    You can loop through the list items by using a{" "}
                    <Code>while</Code> loop.
                </p>
                <p>
                    Use the <Code>len()</Code> function to determine the length
                    of the list, then start at 0 and loop your way through the
                    list items by refering to their indexes.
                </p>
                <p>Remember to increase the index by 1 after each iteration.</p>
                <Example
                    code={
                        'thislist = ["apple", "banana", "cherry"]\ni = 0\nwhile i < len(thislist):\n]tprint(thislist[i])\n\ti = i + 1'
                    }
                    text="Print all items, using a while loop to go through all the index numbers"
                ></Example>
            </Accordion>
        </Fragment>
    );
};
