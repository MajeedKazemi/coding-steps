import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";
import { Message } from "../doc-message";
import { IDocPageProps } from "./types";

export const VariableNamesDoc = (props: IDocPageProps) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            <h1 className="doc-title">Variable Names:</h1>

            <Accordion
                title="Variable Names"
                sectionId="var-names-intro"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    A variable can have a short name (like x and y) or a more
                    descriptive name (age, carname, total_volume). Rules for
                    Python variables:
                </p>
                <ul>
                    <li>
                        A variable name must start with a letter or the
                        underscore character
                    </li>
                    <li>A variable name cannot start with a number</li>
                    <li>
                        A variable name can only contain alpha-numeric
                        characters and underscores (A-z, 0-9, and _ )
                    </li>
                    <li>
                        Variable names are case-sensitive (age, Age and AGE are
                        three different variables)
                    </li>
                </ul>
                <Example
                    code={
                        'myvar = "John"\nmy_var = "John"\n_my_var = "John"\nmyVar = "John"\nMYVAR = "John"\nmyvar2 = "John"'
                    }
                    text="Legal variable names:"
                ></Example>

                <Example
                    code={'2myvar = "John"\nmy-var = "John"\nmy var = "John"'}
                    text="Illegal variable names:"
                    isError
                ></Example>
                <Message>
                    <p>Remember that variable names are case-sensitive</p>
                </Message>
            </Accordion>

            <Accordion
                title="Multi Words Variable Names"
                sectionId="multi-word-var-names"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>
                    Variable names with more than one word can be difficult to
                    read.
                </p>
                <p>
                    There are several techniques you can use to make them more
                    readable:
                </p>

                <h2>Camel Case</h2>
                <Example
                    code={'myVariableName = "John"'}
                    text="Each word, except the first, starts with a capital letter:"
                ></Example>

                <h2>Pascal Case</h2>
                <Example
                    code={'MyVariableName = "John"'}
                    text="Each word starts with a capital letter:"
                ></Example>

                <h2>Snake Case</h2>
                <Example
                    code={'my_variable_name = "John"'}
                    text="Each word is separated by an underscore character:"
                ></Example>
            </Accordion>
        </Fragment>
    );
};
