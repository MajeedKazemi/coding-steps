import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";
import { Code } from "../doc-inline-code";
import { Message } from "../doc-message";
import { IDocPageProps } from "./types";

export const ComparisonsDoc = (props: IDocPageProps) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            <h1 className="doc-title">Comparisons</h1>
            <Accordion
                title="== (equal to)"
                sectionId="=="
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>Compares two values. </p>
                <p>Returns <Code>True</Code> if they are equal, returns <Code>False</Code> otherwise.</p>
                <Example
                    code={
                        `print(1 == 1) #outputs True`
                    }
                ></Example>
                <Example
                    code={
                        `if(1 == 2):\n\tprint("hello world") #no output`
                    }
                ></Example>
            </Accordion>
            <Accordion
                title="!= (not equal to)"
                sectionId="!="
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>Compares two values. </p>
                <p>Returns <Code>True</Code> if they are not equal; returns <Code>False</Code> otherwise.</p>
                <Example
                    code={
                        `print(1 != 1) #outputs False`
                    }
                ></Example>
                <Example
                    code={
                        `if(1 != 2):\n\tprint("hello world") #outputs hello world`
                    }
                ></Example>
            </Accordion>
            <Accordion
                title="< (less than)"
                sectionId="<"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>Compares two values. </p>
                <p>Returns <Code>True</Code> if the left value is less than the right value.</p>
                <Example
                    code={
                        `print(1 < 2) #outputs True`
                    }
                ></Example>
                <Example
                    code={
                        `if(3 < 2):\n\tprint("hello world") #no output`
                    }
                ></Example>
            </Accordion>
            <Accordion
                title="<= (less than or equal to)"
                sectionId="<="
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>Compares two values. </p>
                <p>Returns <Code>True</Code> if the left value is less than or equal to the right value.</p>
                <Example
                    code={
                        `print(1 <= 1) #outputs True`
                    }
                ></Example>
                <Example
                    code={
                        `if(3 < 5):\n\tprint("hello world") #outputs hello world`
                    }
                ></Example>
            </Accordion>
            <Accordion
                title="> (greater than)"
                sectionId=">"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>Compares two values. </p>
                <p>Returns <Code>True</Code> if the left value is greater than the right value.</p>
                <Example
                    code={
                        `print(1 > 2) #outputs False`
                    }
                ></Example>
                <Example
                    code={
                        `if(3 > 2):\n\tprint("hello world") #outputs hello world`
                    }
                ></Example>
            </Accordion>
            <Accordion
                title=">= (greater than or equal to)"
                sectionId=">="
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>Compares two values. </p>
                <p>Returns <Code>True</Code> if the left value is greater than or equal to the right value.</p>
                <Example
                    code={
                        `print(1 >= 1) #outputs True`
                    }
                ></Example>
                <Example
                    code={
                        `if(3 >= 2):\n\tprint("hello world") #outputs hello world`
                    }
                ></Example>
            </Accordion>
            <Accordion
                title="in"
                sectionId="in"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>Returns <Code>True</Code> if the left item is inside the right item; returns <Code>False</Code> otherwise.</p>
                <Example
                    code={
                        `a = 5\nb = [1, 2, 3, 4, 5]\nprint(a in b) #outputs True`
                    }
                ></Example>
            </Accordion>
            <Accordion
                title="not in"
                sectionId="not-in"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>Returns <Code>True</Code> if the left item is not inside the right item; returns <Code>False</Code> otherwise.</p>
                <Example
                    code={
                        `a = 5\nb = [1, 2, 3, 4, 5]\nprint(a not in b) #outputs False`
                    }
                ></Example>
            </Accordion>
        </Fragment>
    );
};