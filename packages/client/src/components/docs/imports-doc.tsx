import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";
import { Code } from "../doc-inline-code";
import { Message } from "../doc-message";
import { IDocPageProps } from "./types";

export const ImportsDoc = (props: IDocPageProps) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            <h1 className="doc-title">Imports</h1>
            <Accordion
                title="Imports"
                sectionId="imports"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>Previously, we dealt with functions and keywords which are included in the Python programming language by default.</p>
                <p>However, some functions are not available by default. These supplementary functions can only be used after we tell Python that we are introducing "add-ons".
We do so by "importing" an add-on pack - a module.</p>
                <Example
                    code={
                        'from random import randint\nfrom random import choice'
                    }
                    text="Imports randint and choice from the random module."
                ></Example>
                <Example
                    code={
                        'from random import randint\nprint(randint(1, 6)) # prints a random number between 1 and 6'
                    }
                    text="Imports randint from the random module and prints a random number between 1 and 6."
                ></Example> 
            </Accordion>
        </Fragment>
    );
};