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
                <p>
                    To change the value of a specific item, refer to the index
                    number:
                </p>
                <Example
                    code={
                        'thislist = ["apple", "banana", "cherry"]\nthislist[1] = "blackcurrant"\nprint(thislist) #outputs ["apple", "blackcurrant", "cherry"]'
                    }
                    text="Change the second item:"
                ></Example>
            </Accordion>
        </Fragment>
    );
};