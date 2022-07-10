import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";
import { IDocPageProps } from "./types";

export const CommentsDoc = (props: IDocPageProps) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            <h1 className="doc-title">Comments:</h1>

            <Accordion
                title="Python Comments"
                sectionId="python-comments"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>Comments can be used to explain Python code.</p>
                <p>Comments can be used to make the code more readable.</p>
                <p>
                    Comments can be used to prevent execution when testing code.
                </p>
                <h2>Creating a Comment</h2>
                <p>Comments starts with a #, and Python will ignore them:</p>
                <Example
                    code={'# This is a comment.\nprint("Hello, World!")'}
                    text={"Comments in Python:"}
                ></Example>

                <p>
                    Comments can be placed at the end of a line, and Python will
                    ignore the rest of the line:
                </p>
                <Example
                    code={'print("Hello, World!") #This is a comment'}
                ></Example>

                <p>
                    A comment does not have to be text that explains the code,
                    it can also be used to prevent Python from executing code:
                </p>
                <Example
                    code={'# print("Hello, World!")\nprint("Hello, World!")'}
                    text={"Comments in Python:"}
                ></Example>
            </Accordion>

            <Accordion
                title="Multi Line Comments"
                sectionId="multiline-comments"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    Python does not really have a syntax for multi line
                    comments.
                </p>
                <p>
                    To add a multiline comment you could insert a # for each
                    line:
                </p>
                <Example
                    code={
                        '# This is a comment\n# written in#more than just one line\nprint("Hello, World!")'
                    }
                    text={"Comments in Python:"}
                ></Example>

                <p>
                    Or, not quite as intended, you can use a multiline string.
                </p>
                <p>
                    Since Python will ignore string literals that are not
                    assigned to a variable, you can add a multiline string
                    (triple quotes) in your code, and place your comment inside
                    it:
                </p>
                <Example
                    code={
                        '"""This is a comment\nwritten in\nmore than just one line"""\nprint("Hello, World!")'
                    }
                    text={"Comments in Python:"}
                ></Example>

                <p>
                    As long as the string is not assigned to a variable, Python
                    will read the code, but then ignore it, and you have made a
                    multiline comment.
                </p>
            </Accordion>
        </Fragment>
    );
};
