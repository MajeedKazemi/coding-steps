import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";
import { Code } from "../doc-inline-code";
import { Message } from "../doc-message";
import { IDocPageProps } from "./types";

export const ErrorsDoc = (props: IDocPageProps) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            <h1 className="doc-title">Syntax Error Guide</h1>
            <Accordion
                title="SyntaxError: invalid syntax"
                sectionId="invalid_syntax"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <table>
                    <thead>
                        <tr className="bold">This may be because:</tr>
                    </thead>
                    <tbody>
                        <tr>- you missed a colon <Code>:</Code> at the end of an <Code>if</Code>-statement / a <Code>for</Code>-loop / a <Code>while</Code>-loop, etc</tr>
                        <tr>- you missed a closing parenthesis / brackets <Code>{')'}</Code></tr>
                        <tr>- you used a single equality sign <Code>=</Code> rather than a double equality sign <Code>==</Code> when comparing values</tr>
                    </tbody>
                </table>
                <Message>
                    <p>Refer to the "Syntax" section in the documentation</p>
                </Message>
            </Accordion>
            <Accordion
                title="TypeError: can only concatenate ___ to ___"
                sectionId="concatenate_error"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <table>
                    <thead>
                        <tr className="bold">This may be because:</tr>
                    </thead>
                    <tbody>
                        <tr>- you tried to add/concatenate two items of different types</tr>
                    </tbody>
                </table>
                <Message>
                    <p>Refer to the "Useful Tools For Data Types" under the "Data Types" section in the documentation</p>
                </Message> 
            </Accordion>
            <Accordion
                title="NameError: name ___ is not defined"
                sectionId="name_error"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <table>
                    <thead>
                        <tr className="bold">This may be because:</tr>
                    </thead>
                    <tbody>
                        <tr>- you tried to use a variable that has yet to be defined or assigned a value</tr>
                        <tr>- you forgot to put quotes (single quotes or double quotes, whichever you like, as long as they are consistent) around your strings</tr>
                        <tr>- if you encounter: "NameError: name 'random' is not defined" specifically,</tr>
                        <tr>- you forgot to "import random" before you use functions in the random library</tr>
                    </tbody>
                </table>
            </Accordion>
            <Accordion
                title="ZeroDivisionError: division by zero"
                sectionId="zero_division_error"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <table>
                    <thead>
                        <tr className="bold">This may be because:</tr>
                    </thead>
                    <tbody>
                        <tr>- you tried to divide a number by zero</tr>
                        <tr>- you tried to divide a number by a variable, which happened to be zero</tr>
                    </tbody>
                </table>
            </Accordion>
            <Accordion
                title="IndexError: list index out of range"
                sectionId="index_error"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <table>
                    <thead>
                        <tr className="bold">This may be because:</tr>
                    </thead>
                    <tbody>
                        <tr>- you tried to access a non-existent element in a list</tr>
                        <tr>- CAREFUL: list indices start with 0</tr>
                        <tr>- to access the first element of a list of five strings, use index 0</tr>
                        <tr>- to access the last element of a list of five strings, use index 4</tr>
                    </tbody>
                </table>
            </Accordion>
            <Accordion
                title="IndexError: string index out of range"
                sectionId="string_index_error"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <table>
                    <thead>
                        <tr className="bold">This may be because:</tr>
                    </thead>
                    <tbody>
                        <tr>- you tried to access a non-existent character in a string</tr>
                        <tr>- CAREFUL: string indices start with 0</tr>
                        <tr>- to access the first character of a string of five characters, use index 0</tr>
                        <tr>- to access the last character of a string of five characters, use index 4</tr>
                    </tbody>
                </table>
            </Accordion>
        </Fragment>
    );
};