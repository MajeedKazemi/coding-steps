import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";
import { Code } from "../doc-inline-code";
import { Message } from "../doc-message";
import { IDocPageProps } from "./types";

export const FunctionsDoc = (props: IDocPageProps) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            <h1 className="doc-title">Python Functions:</h1>

            <h2 className="doc-subtitle">Math Functions</h2>
            <Accordion
                title="abs()"
                sectionId="abs"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>Returns the absolute value of a number.</p>
                <Message>
                    <p>
                        Parameters: <Code>abs(number)</Code>
                    </p>
                </Message>
                <Example
                    code={
                        'abs(10) # evaluates to 10\n' +
                        'abs(-15) # evaluates to 15'
                    }
                ></Example>
            </Accordion>

            <Accordion
                title="pow()"
                sectionId="pow"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>Returns a number raised to an exponent.</p>
                <Message>
                    <p>
                        Parameters: <Code>pow(base_number, exponent)</Code>
                    </p>
                </Message>
                <Example
                    code={
                        "pow(a,b) # evaluates to a^b\npow(2,3) # evaluates to 8\npow(3,2) # evaluates to 9"
                    }
                ></Example>
            </Accordion>

            <Accordion
                title="round()"
                sectionId="round"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>Rounds a number to the specified decimals</p>
                <Message>
                    <p>
                        Parameters: <Code>round(number_to_round, number_of_decimals)</Code>
                    </p>
                </Message>
                <Example
                    code={
                        `round(2.4, 0) # evaluates to 2.0\nround(3.8, 0) # evalutes to 4.0\nround(3.86, 1) # evaluates to 3.9`
                    }
                ></Example>
            </Accordion>
            
        </Fragment>
    );
};
