import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";
import { Code } from "../doc-inline-code";
import { IDocPageProps } from "./types";

export const OperatorsDoc = (props: IDocPageProps) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            <h1 className="doc-title">Basic Operators:</h1>

            <Accordion
                title="Python Operators"
                sectionId="operators-intro"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    Operators are used to perform operations on variables and
                    values.
                </p>
                <p>
                    In the example below, we use the <Code>+</Code> operator to
                    add together two values:
                </p>
                <Example code={"print(10 + 5)"}></Example>
                <p>Python divides the operators in the following groups:</p>
                <ul>
                    <li>Arithmetic operators</li>
                    <li>Assignment operators</li>
                    <li>Comparison operators</li>
                    <li>Logical operators</li>
                    <li>Identity operators</li>
                    <li>Membership operators</li>
                    <li>Bitwise operators</li>
                </ul>
            </Accordion>

            <Accordion
                title="Python Arithmetic Operators"
                sectionId="arithmetic-operators"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    Arithmetic operators are used with numeric values to perform
                    common mathematical operations:
                </p>
                <table>
                    <thead>
                        <tr>
                            <th>Operator</th>
                            <th>Name</th>
                            <th>Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Code>+</Code>
                            </td>
                            <td>Addition</td>
                            <td>
                                <Code>x + y</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Code>-</Code>
                            </td>
                            <td>Subtraction</td>
                            <td>
                                <Code>x - y</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Code>*</Code>
                            </td>
                            <td>Multiplication</td>
                            <td>
                                <Code>x * y</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Code>/</Code>
                            </td>
                            <td>Division</td>
                            <td>
                                <Code>x / y</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Code>%</Code>
                            </td>
                            <td>Modulus</td>
                            <td>
                                <Code>x % y</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Code>**</Code>
                            </td>
                            <td>Exponentiation</td>
                            <td>
                                <Code>x ** y</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Code>{"//"}</Code>
                            </td>
                            <td>Floor Division</td>
                            <td>
                                <Code>x // y</Code>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Accordion>

            <Accordion
                title="Python Assignment Operators"
                sectionId="assignment-operators"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    Assignment operators are used to assign values to variables:
                </p>
                <table>
                    <thead>
                        <tr>
                            <th>Operator</th>
                            <th>Example</th>
                            <th>Same as</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Code>=</Code>
                            </td>
                            <td>
                                <Code>x = 5</Code>
                            </td>
                            <td>
                                <Code>x = 5</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Code>+=</Code>
                            </td>
                            <td>
                                <Code>x += 3</Code>
                            </td>
                            <td>
                                <Code>x = x + 3</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Code>-=</Code>
                            </td>
                            <td>
                                <Code>x -= 3</Code>
                            </td>
                            <td>
                                <Code>x = x - 3</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Code>*=</Code>
                            </td>
                            <td>
                                <Code>x *= 3</Code>
                            </td>
                            <td>
                                <Code>x = x * 3</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Code>/=</Code>
                            </td>
                            <td>
                                <Code>x /= 3</Code>
                            </td>
                            <td>
                                <Code>x = x / 3</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Code>%=</Code>
                            </td>
                            <td>
                                <Code>x %= 3</Code>
                            </td>
                            <td>
                                <Code>x = x % 3</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Code>{"//="}</Code>
                            </td>
                            <td>
                                <Code>x //= 3</Code>
                            </td>
                            <td>
                                <Code>x = x // 3</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Code>{"**="}</Code>
                            </td>
                            <td>
                                <Code>x **= 3</Code>
                            </td>
                            <td>
                                <Code>x = x ** 3</Code>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Accordion>

            <Accordion
                title="Python Comparison Operators"
                sectionId="comparison-operators"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>Comparison operators are used to compare two values:</p>
                <table>
                    <thead>
                        <tr>
                            <th>Operator</th>
                            <th>Name</th>
                            <th>Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Code>==</Code>
                            </td>
                            <td>Equal</td>
                            <td>
                                <Code>x == y</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Code>!=</Code>
                            </td>
                            <td>Not equal</td>
                            <td>
                                <Code>x != y</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Code>{">"}</Code>
                            </td>
                            <td>Greater than</td>
                            <td>
                                <Code>{"x > y"}</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Code>{"<"}</Code>
                            </td>
                            <td>Less than</td>
                            <td>
                                <Code>{"x < y"}</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Code>{">="}</Code>
                            </td>
                            <td>Greater than or equal to</td>
                            <td>
                                <Code>{"x >= y"}</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Code>{"<="}</Code>
                            </td>
                            <td>Less than or equal</td>
                            <td>
                                <Code>{"x <= y"}</Code>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Accordion>

            <Accordion
                title="Python Logical Operators"
                sectionId="logical-operators"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    Logical operators are used to combine conditional
                    statements:
                </p>
                <table>
                    <thead>
                        <tr>
                            <th>Operator</th>
                            <th>Description</th>
                            <th>Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Code>and</Code>
                            </td>
                            <td>Returns True if both statements are true</td>
                            <td>
                                <Code>{"x < 5 and x < 10"}</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Code>or</Code>
                            </td>
                            <td>
                                Returns True if one of the statements is true
                            </td>
                            <td>
                                <Code>{"x < 5 or x < 4"}</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Code>not</Code>
                            </td>
                            <td>
                                Reverse the result, returns False if the result
                                is true
                            </td>
                            <td>
                                <Code>{"not(x < 5 and x < 10)"}</Code>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Accordion>

            <Accordion
                title="Python Membership Operators"
                sectionId="membership-operators"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    Membership operators are used to test if a sequence is
                    presented in an object:
                </p>
                <table>
                    <thead>
                        <tr>
                            <th>Operator</th>
                            <th>Description</th>
                            <th>Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Code>in</Code>
                            </td>
                            <td>
                                Returns True if a sequence with the specified
                                value is present in the object
                            </td>
                            <td>
                                <Code>{"x in y"}</Code>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Code>not in</Code>
                            </td>
                            <td>
                                Returns True if a sequence with the specified
                                value is not present in the object
                            </td>
                            <td>
                                <Code>{"x not in y"}</Code>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Accordion>
        </Fragment>
    );
};
