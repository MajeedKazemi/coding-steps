import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";
import { Code } from "../doc-inline-code";
import { Message } from "../doc-message";

export const ListsDoc = ({ pageName = "lists" }) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            <h1 className="doc-title">Lists:</h1>

            <Accordion
                title="Introduction to Lists"
                section="lists-intro"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>
                    Lists are used to store multiple items in a single variable.
                </p>
                <p>
                    Lists are one of 4 built-in data types in Python used to
                    store collections of data, the other 3 are Tuple, Set, and
                    Dictionary, all with different qualities and usage.
                </p>
                <p>Lists are created using square brackets:</p>
                <Example
                    code={
                        'thislist = ["apple", "banana", "cherry"]\nprint(thislist)'
                    }
                    text="Create a List:"
                ></Example>
            </Accordion>

            <Accordion
                title="List Items"
                section="list-items"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>
                    List items are ordered, changeable, and allow duplicate
                    values.
                </p>
                <p>
                    List items are indexed, the first item has index{" "}
                    <Code>[0]</Code>, the second item has index <Code>[1]</Code>{" "}
                    etc.
                </p>
            </Accordion>

            <Accordion
                title="List Properties"
                section="list-props"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <h2>Ordered</h2>
                <p>
                    When we say that lists are ordered, it means that the items
                    have a defined order, and that order will not change.
                </p>
                <p>
                    If you add new items to a list, the new items will be placed
                    at the end of the list.
                </p>
                <Message>
                    <p>
                        Note: There are some list methods that will change the
                        order, but in general: the order of the items will not
                        change.
                    </p>
                </Message>

                <h2>Changeable</h2>
                <p>
                    The list is changeable, meaning that we can change, add, and
                    remove items in a list after it has been created.
                </p>
            </Accordion>

            <Accordion
                title="Allow Duplicates"
                section="allow-duplicates"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>
                    Since lists are indexed, lists can have items with the same
                    value:
                </p>
                <Example
                    code={
                        'thislist = ["apple", "banana", "cherry", "apple", "cherry"]\nprint(thislist)'
                    }
                    text="Lists allow duplicate values:"
                ></Example>
            </Accordion>

            <Accordion
                title="List Length"
                section="list-length"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>
                    To determine how many items a list has, use the{" "}
                    <Code>len()</Code> function:
                </p>
                <Example
                    code={
                        'thislist = ["apple", "banana", "cherry"]\nprint(len(thislist))'
                    }
                    text="Print the number of items in the list:"
                ></Example>
            </Accordion>

            <Accordion
                title="List Items - Data Types"
                section="list-items-types"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>List items can be of any data type:</p>
                <Example
                    code={
                        'list1 = ["apple", "banana", "cherry"]\nlist2 = [1, 5, 7, 9, 3]\nlist3 = [True, False, False]'
                    }
                    text="String, int and boolean data types:"
                ></Example>

                <p>A list can contain different data types:</p>
                <Example
                    code={'list1 = ["abc", 34, True, 40, "male"]'}
                ></Example>
                <Example
                    code={'list1 = ["abc", 34, True, 40, "male"]'}
                ></Example>
            </Accordion>

            <Accordion
                title="The type() function"
                section="type-function"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>
                    {
                        "From Python's perspective, lists are defined as objects with the data type 'list':"
                    }
                </p>
                <p>
                    <Code>
                        {
                            "<class 'list'section='specify-var-type' page={pageName} click={(cur: string) => { setCurrent(cur) }} current={current}>"
                        }
                    </Code>
                </p>
                <Example
                    code={
                        'mylist = ["apple", "banana", "cherry"]\nprint(type(mylist))'
                    }
                    text="What is the data type of a list?"
                ></Example>
            </Accordion>

            <Accordion
                title="The list() constructor"
                section="list-constructor"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>
                    It is also possible to use the <Code>list()</Code>{" "}
                    constructor when creating a new list.
                </p>
                <Example
                    code={
                        'thislist = list(("apple", "banana", "cherry")) # note the double round-brackets\nprint(thislist)'
                    }
                    text="Using the list() constructor to make a List:"
                ></Example>
            </Accordion>
        </Fragment>
    );
};
