import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";
import { Code } from "../doc-inline-code";
import { Message } from "../doc-message";
import { IDocPageProps } from "./types";

export const ModifyingStringsDoc = (props: IDocPageProps) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            <h1 className="doc-title">Strings</h1>
            <Accordion
                title="Combining Strings"
                sectionId="combining_strings"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>Strings can be added together using the <Code>+</Code> operator.</p>
                <Example
                    code={
                        `firstName = "Justin"\nlastName = "Timberlake"\nfullName = firstName + " " + lastName\nprint(fullName) #outputs "Justin Timberlake"`
                    }
                ></Example>
            </Accordion>
            <Accordion
                title="Accesing Parts of a String"
                sectionId="accessing_parts_of_a_string"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    Strings in Python are simply arrays of characters.
                </p>
                <p>
                    Square brackets can be used to access elements of the
                    string.
                </p>
                <Example
                    code={'a = "Hello, World!"\nprint(a[1])'}
                    text="Get the character at position 1 (remember that the first character has the position 0):"
                ></Example>
            </Accordion>
            <h2 className="doc-subtitle">String Functions</h2>
            <Accordion
                title="Splitting Strings Into A List"
                sectionId=".split()"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>Splits the text into a list of components based on the input (as a separator).</p>
                <Example
                    code={
                        `name = "Split-this-text-on-hyphen"\nsplitName = name.split("-")\nprint(splitName) #outputs ["Split", "this", "text", "on", "hyphen"]`
                    }
                ></Example>
            </Accordion>
            <Accordion
                title="Joining Strings From A List"
                sectionId=".join()"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>Uses this text as a separator to join a list of values together into a new text.</p>
                <Example
                    code={
                        `names = ["Anna", "John", "Peter"]\njoinedNames = "-".join(names)\nprint(joinedNames) #outputs "Anna-John-Peter"`
                    }
                ></Example>
            </Accordion>
            <Accordion
                title="Finding Substrings"
                sectionId=".find()"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>Finds the first occurrence of the input's textual value in the text.</p>
                <Example
                    code={
                        `name = "Zimmer"\nindexOfE = name.find("e")\nprint(indexOfE) #outputs 3`
                    }
                ></Example>
            </Accordion>
            <Accordion
                title="Replacing Substrings"
                sectionId=".replace()"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>Replaces all occurrences of the first input with the value of the second input in the text.</p>
                <Example
                    code={
                        `name  = "John"\nname = name.replace("oh", "a")\nprint(name) #outputs "Jane"`
                    }
                ></Example>
            </Accordion>
        </Fragment>
    );
};