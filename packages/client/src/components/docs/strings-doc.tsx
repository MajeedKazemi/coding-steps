import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";
import { Code } from "../doc-inline-code";
import { Message } from "../doc-message";
import { IDocPageProps } from "./types";

export const StringsDoc = (props: IDocPageProps) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            <h1 className="doc-title">Strings:</h1>

            <Accordion
                title="Strings"
                sectionId="strings-intro"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    Strings in python are surrounded by either single quotation
                    marks, or double quotation marks.
                </p>
                <p>
                    <Code>{"'hello'"}</Code> is the same as{" "}
                    <Code>{'"Hello"'}</Code>
                </p>
                <p>
                    You can display a string literal with the{" "}
                    <Code>print()</Code> function:
                </p>
                <Example code={"print(\"Hello\")\nprint('Hello')"}></Example>
            </Accordion>

            <Accordion
                title="Assign String to a Variable"
                sectionId="str-to-var"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    Assigning a string to a variable is done with the variable
                    name followed by an equal sign and the string:
                </p>
                <Example code={'a = "Hello"\nprint(a)'}></Example>
            </Accordion>

            <Accordion
                title="Multiline Strings"
                sectionId="multiline-str"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    You can assign a multiline string to a variable by using
                    three quotes:
                </p>
                <Example
                    code={
                        'a = """Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit,\nsed do eiusmod tempor incididunt\nut labore et dolore magna aliqua."""\nprint(a)'
                    }
                    text="You can use three double quotes:"
                ></Example>

                <p>Or three single quotes:</p>
                <Example
                    code={
                        "a = '''Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit,\nsed do eiusmod tempor incididunt\nut labore et dolore magna aliqua.'''\nprint(a)"
                    }
                ></Example>
                <Message>
                    Note: in the result, the line breaks are inserted at the
                    same position as in the code.
                </Message>
            </Accordion>

            <Accordion
                title="Strings are Arrays"
                sectionId="str-are-arrays"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    Like many other popular programming languages, strings in
                    Python are arrays of bytes representing unicode characters.
                </p>
                <p>
                    However, Python does not have a character data type, a
                    single character is simply a string with a length of 1.
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

            <Accordion
                title="Looping Through a String"
                sectionId="loop-through-str"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    Since strings are arrays, we can loop through the characters
                    in a string, with a for loop.
                </p>
                <Example
                    code={'for x in "banana":\nprint(x)'}
                    text='Loop through the letters in the word "banana":'
                ></Example>

                <p>
                    Learn more about For Loops in our Python For Loops chapter.
                </p>
            </Accordion>

            <Accordion
                title="String Length"
                sectionId="str-length"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>To get the length of a string, use the len() function.</p>
                <Example
                    code={'a = "Hello, World!"\nprint(len(a))'}
                    text="The len() function returns the length of a string:"
                ></Example>
            </Accordion>

            <Accordion
                title="Check String"
                sectionId="check-str"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    To check if a certain phrase or character is present in a
                    string, we can use the keyword in.
                </p>
                <Example
                    code={
                        'txt = "The best things in life are free!"\nprint("free" in txt)'
                    }
                    text='Check if "free" is present in the following text:'
                ></Example>

                <p>Use it in an if statement:</p>
                <Example
                    code={
                        'txt = "The best things in life are free!"\nif "free" in txt:\n\tprint("Yes, \'free\' is present.")'
                    }
                    text='Print only if "free" is present:'
                ></Example>
            </Accordion>

            <Accordion
                title="Check if NOT"
                sectionId="check-not-str"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    To check if a certain phrase or character is NOT present in
                    a string, we can use the keyword not in.
                </p>
                <Example
                    code={
                        'txt = "The best things in life are free!"\nprint("expensive" not in txt)'
                    }
                    text='Check if "expensive" is NOT present in the following text:'
                ></Example>

                <p>Use it in an if statement:</p>
                <Example
                    code={
                        'txt = "The best things in life are free!"\nif "expensive" not in txt:\n\tprint("No, \'expensive\' is NOT present.")'
                    }
                    text='print only if "expensive" is NOT present:'
                ></Example>
            </Accordion>
        </Fragment>
    );
};
