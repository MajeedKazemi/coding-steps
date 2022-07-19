import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";
import { Code } from "../doc-inline-code";
import { Message } from "../doc-message";
import { IDocPageProps } from "./types";

export const DataTypesDoc = (props: IDocPageProps) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            <h1 className="doc-title">Data Types:</h1>

            <Accordion
                title="Intro To Data Types"
                sectionId="intro-data-types"
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
                    Python has many different data types. Below are a list of some of the more common data types.
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
                            <Code>int</Code>, <Code>float</Code>
                        </td>
                    </tr>
                    <tr>
                        <td>Sequence Types:</td>
                        <td>
                            <Code>list</Code>
                        </td>
                    </tr>
                    <tr>
                        <td>Boolean Type:</td>
                        <td>
                            <Code>bool</Code>
                        </td>
                    </tr>
                </table>
            </Accordion>

            <Accordion
                title="Strings"
                sectionId="strings"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    Strings are Python's equivalent for words.
                </p>
                <p>
                    If you wish to express words (in English or otherwise), you must enclose them in quotation marks <Code>"</Code> to make them Python strings.
                    
                </p>
                <p>Single quotes <Code>'</Code> or double quotes <Code>"</Code> do not matter, as long as you are consistent with it.</p>
                <table>
                    <thead>
                        <tr>
                            <th>Examples</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <Code>"This is a String"</Code>
                        </tr>
                        <tr>
                            <Code>'This is also a string'</Code>
                        </tr>
                        <tr>
                            <Code>"Use a string to store and convey a message"</Code>
                        </tr>
                    </tbody>
                </table>
            </Accordion>

            <Accordion
                title="Integers"
                sectionId="integers"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    Integers are whole numbers
                </p>
                <p>
                    They can be positive, negative, or zero.
                </p>
                <table>
                    <thead>
                        <tr>
                            <th>Examples</th>
                        </tr>
                    </thead>
                    <tbody>
                       <tr>
                            <Code>3</Code>
                        </tr>
                        <tr>
                            <Code>-4</Code>
                        </tr>
                        <tr>
                            <Code>0</Code>
                        </tr>
                    </tbody>
                </table>
                <Message>
                    <p>
                        Note that integers CANNOT contain decimal places.
                    </p>
                </Message>
                <Message>
                    <p>
                        Integers are NOT enclosed in quotation marks.
                    </p>
                </Message>
            </Accordion>

            <Accordion
                title="Floats"
                sectionId="floats"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    Floats are numbers that contain decimal places
                </p>
                <p>
                    Floats can be postive, negative, or zero.
                </p>
                <p>
                    Floats can also resemble integers (like <Code>100.0</Code>), but the <Code>.0</Code> decimal place will always be shown explicitly.
                </p>
                <table>
                    <thead>
                        <tr>
                            <th>Examples</th>
                        </tr>
                    </thead>
                    <tbody>
                       <tr>
                            <Code>3.14159</Code>
                        </tr>
                        <tr>
                            <Code>-1.63</Code>
                        </tr>
                        <tr>
                            <Code>0.0</Code>
                        </tr>
                        <tr>
                            <Code>100.0</Code>
                        </tr>
                    </tbody>
                </table>
                <Message>
                    <p>
                        Floats are also NOT enclosed in quotation marks.
                    </p>
                </Message>
            </Accordion>

            <Accordion
                title="Booleans"
                sectionId="booleans"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    Booleans can either be <Code>True</Code> or <Code>False</Code>
                </p>
                <p>
                    Every comparison you make such as <Code>{'10 < 100'}</Code> is a Boolean (<Code>{'10 < 100'}</Code> simplifies into <Code>True</Code>)
                </p>
            </Accordion>

            <h2 className="doc-subtitle">Useful Tools For Data Types</h2>

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
                    In Python, you can convert between data types by using the following functions
                </p>
                <table>
                    <thead>
                        <tr>
                            <th>Function</th>
                            <th>What It Does</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><Code>str()</Code></td>
                            <td>Converts the chosen data type to a string</td>
                        </tr>
                        <tr>
                            <td><Code>int()</Code></td>
                            <td>Converts the chosen data type to a integer</td>
                        </tr>
                        <tr>
                            <td><Code>float()</Code></td>
                            <td>Converts the chosen data type to a float</td>
                        </tr>
                    </tbody>
                </table>
                <Example
                    code={'str(5)'}
                    text={'Returns the integer 5 as a string'}
                ></Example>
                <Example
                    code={'int("10")'}
                    text={`Converts the string "10" to an integer`}
                ></Example>
                <Example
                    code={'float(10)'}
                    text={`Converts the integer 10 to a float of 10.0`}
                ></Example>
            </Accordion>
        </Fragment>
    );
};
