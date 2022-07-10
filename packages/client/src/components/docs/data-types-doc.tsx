import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";
import { Code } from "../doc-inline-code";
import { IDocPageProps } from "./types";

export const DataTypesDoc = (props: IDocPageProps) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            <h1 className="doc-title">Data Types:</h1>

            <Accordion
                title="Built-in Data Types"
                sectionId="built-in-types"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>In programming, data type is an important concept.</p>
                <p>
                    Variables can store data of different types, and different
                    types can do different things.
                </p>
                <p>
                    Python has the following data types built-in by default, in
                    these categories:
                </p>

                <table className="table-fixed">
                    <tr>
                        <td>Text Type:</td>
                        <td>
                            <Code>str</Code>
                        </td>
                    </tr>
                    <tr>
                        <td>Numeric Types:</td>
                        <td>
                            <Code>int</Code>, <Code>float</Code>,{" "}
                            <Code>complex</Code>
                        </td>
                    </tr>
                    <tr>
                        <td>Sequence Types:</td>
                        <td>
                            <Code>list</Code>, <Code>tuple</Code>,{" "}
                            <Code>range</Code>
                        </td>
                    </tr>
                    <tr>
                        <td>Mapping Type:</td>
                        <td>
                            <Code>dict</Code>
                        </td>
                    </tr>
                    <tr>
                        <td>Set Types:</td>
                        <td>
                            <Code>set</Code>, <Code>frozenset</Code>
                        </td>
                    </tr>
                    <tr>
                        <td>Boolean Type:</td>
                        <td>
                            <Code>bool</Code>
                        </td>
                    </tr>
                    <tr>
                        <td>Binary Types:</td>
                        <td>
                            <Code>bytes</Code>, <Code>bytearray</Code>,{" "}
                            <Code>memoryview</Code>
                        </td>
                    </tr>
                </table>
            </Accordion>

            <Accordion
                title="Getting the Data Type"
                sectionId="getting-type"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    You can get the data type of any object by using the{" "}
                    <Code>type()</Code> function:
                </p>
                <Example
                    code={"x = 5\nprint(type(x))"}
                    text="Print the data type of the variable x:"
                ></Example>
            </Accordion>

            <Accordion
                title="Setting the Data Type"
                sectionId="setting-type"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    In Python, the data type is set when you assign a value to a
                    variable:
                </p>

                <table>
                    <thead>
                        <tr>
                            <th>Example</th>
                            <th>Data Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Code>{'x = "Hello World"'}</Code>
                            </td>
                            <td>
                                <Code>str</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Code>{"x = 20"}</Code>
                            </td>
                            <td>
                                <Code>int</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Code>{"x = 20.5"}</Code>
                            </td>
                            <td>
                                <Code>float</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Code>{"1j"}</Code>
                            </td>
                            <td>
                                <Code>complex</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Code>
                                    {'x = ["apple", "banana", "cherry"]'}
                                </Code>
                            </td>
                            <td>
                                <Code>list</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Code>
                                    {'x = ("apple", "banana", "cherry")'}
                                </Code>
                            </td>
                            <td>
                                <Code>tuple</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Code>{"x = range(6)"}</Code>
                            </td>
                            <td>
                                <Code>range</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Code>
                                    {'x = {"name" : "John", "age" : 36}'}
                                </Code>
                            </td>
                            <td>
                                <Code>dict</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Code>
                                    {'x = {"apple", "banana", "cherry"}'}
                                </Code>
                            </td>
                            <td>
                                <Code>set</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Code>
                                    {
                                        'x = frozenset({"apple", "banana", "cherry"})'
                                    }
                                </Code>
                            </td>
                            <td>
                                <Code>frozense</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Code>{"x = True"}</Code>
                            </td>
                            <td>
                                <Code>bool</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Code>{'x = b"Hello"'}</Code>
                            </td>
                            <td>
                                <Code>bytes</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Code>{"x = bytearray(5)"}</Code>
                            </td>
                            <td>
                                <Code>bytesarray</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Code>{"x = memoryview(bytes(5))"}</Code>
                            </td>
                            <td>
                                <Code>memoryview</Code>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Accordion>

            <Accordion
                title="Changing the Data Type"
                sectionId="changing-type"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    In Python, you can convert an integer (number) to a string
                    (text) like this:
                </p>
                <Example
                    code={'x = 5\nprint("number is: " + str(x))'}
                    text='Converts x to a string and then concatenates it to the "number is: " string. The code will finally display 5'
                ></Example>

                <p>
                    In Python, you can convert a string (text) to a number
                    (integer) like this:
                </p>
                <Example
                    code={'x = "5"\nprint(int(x) + 5)'}
                    text="Converts x to a number and then performs the numeric addition operation. The code will finally display 10"
                ></Example>
            </Accordion>
        </Fragment>
    );
};
