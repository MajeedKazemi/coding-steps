import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";
import { Code } from "../doc-inline-code";
import { Message } from "../doc-message";
import { IDocPageProps } from "./types";

export const LogicalOperatorsDoc = (props: IDocPageProps) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            <h1 className="doc-title">Logical Operators</h1>
            <Accordion
                title="and operator"
                sectionId="and-operator"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>Used to combine conditional expressions.</p>
                <p>Results in <Code>True</Code> if both the left and right expressions are <Code>True</Code>; returns <Code>False</Code> otherwise.</p>
                <Example
                    code={
                        `if (True and True):\n\tprint(true)\n\nif (True and False):\n\tprint("not true")\n\nif (False and True):\n\tprint("still not true")\n\nif (False and False):\n\tprint("also false")`
                    }
                ></Example>
                <Example
                    code={
                        `if(1 == 2):\n\tprint("hello world") #no output`
                    }
                ></Example>
            </Accordion>
            <Accordion
                title="or operator"
                sectionId="or-operator"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>Used to combine conditional expressions.</p>
                <p>Results in <Code>True</Code> as long as at least one of the left and right expressions are <Code>True</Code>; returns <Code>False</Code> otherwise.</p>
                <Example
                    code={
                        `if (True and True):\n\tprint(true)\n\nif (True and False):\n\tprint("not true")\n\nif (False and True):\n\tprint("still not true")\n\nif (False and False):\n\tprint("also false")`
                    }
                ></Example>
                <Example
                    code={
                        `if (True or True):\n\tprint(true)\n\nif (True or False):\n\tprint("true")\n\nif (False or True):\n\tprint("still true")\n\nif (False or False):\n\tprint("false")`
                    }
                ></Example>
            </Accordion>
            <Accordion
                title="not operator"
                sectionId="not-operator"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>Flips the truth value of an expression</p>
                <p><Code>True</Code> becomes <Code>False</Code>, and <Code>False</Code> becomes <Code>True</Code></p>
                <Example
                    code={
                        `a = 2\nb = 2\nif not (a == b):\n\tprint("Will not print.")\n\nif not (b != a):\n\tprint("b is equal to a")\n#prints "b is equal to a"`
                    }
                ></Example>
            </Accordion>
            
        </Fragment>
    );
};