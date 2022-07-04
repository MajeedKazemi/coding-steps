import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";
import { Code } from "../doc-inline-code";
import { Message } from "../doc-message";

export const UserInputDoc = ({ pageName = "user-input" }) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            <h1 className="doc-title">Obtaining User Input:</h1>

            <Accordion
                title="User Input"
                section="user-input-intro"
                page={pageName}
                click={(cur: string) => {
                    setCurrent(cur);
                }}
                current={current}
            >
                <p>Python allows for user input.</p>
                <p>That means we are able to ask the user for input.</p>
                <p>
                    The following example asks for the username, and when you
                    entered the username, it gets printed on the screen:
                </p>
                <Example
                    code={
                        'username = input("Enter username:")\nprint("Username is: " + username)'
                    }
                ></Example>

                <Message>
                    <p>
                        Python stops executing when it comes to the{" "}
                        <Code>input()</Code> function, and continues when the
                        user has given some input.
                    </p>
                </Message>
                <Message>
                    <p>
                        The <Code>input()</Code> function returns a{" "}
                        <Code>str</Code>
                    </p>
                </Message>
            </Accordion>
        </Fragment>
    );
};
