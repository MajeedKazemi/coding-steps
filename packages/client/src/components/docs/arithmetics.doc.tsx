import { Fragment, useState } from "react";

import { Accordion } from "../accordion";
import { Example } from "../doc-example";
import { Code } from "../doc-inline-code";
import { Message } from "../doc-message";
import { IDocPageProps } from "./types";

export const ArithmeticsDoc = (props: IDocPageProps) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            <h1 className="doc-title">Arithmetics</h1>
            <Accordion
                title="+ (add)"
                sectionId="+_addition"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>Adds the values to the left and right of the operator.</p>
                <Example
                    code={
                        `print(1 + 1) #outputs 2`
                    }
                ></Example>
                <Example
                    code={
                        `num1 = 1\nnum2 = 2\nprint(num1 + num2) #outputs 3`
                    }
                ></Example>
            </Accordion>
            <Accordion
                title="- (subtract)"
                sectionId="-_subtraction"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>Subtracts the value to the right of the operator from the value to the left.</p>
                <Example
                    code={
                        `print(1 - 1) #outputs 0`
                    }
                ></Example>
                <Example
                    code={
                        `num1 = 1\nnum2 = 2\nprint(num1 - num2) #outputs -1`
                    }
                ></Example>
            </Accordion>
            <Accordion
                title="* (multiply)"
                sectionId="*_multiplication"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>Multiplies the values to the left and right of the operator.</p>
                <Example
                    code={
                        `print(3 * 2) #outputs 6`
                    }
                ></Example>
                <Example
                    code={
                        `num1 = 4\nnum2 = 2\nprint(num1 * num2) #outputs 8`
                    }
                ></Example>
            </Accordion>
            <Accordion
                title="/ (divide)"
                sectionId="/_division"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>Divides the values to the left of the operator by the right value.</p>
                <Example
                    code={
                        `print(4 / 2) #outputs 2.0`
                    }
                ></Example>
                <Example
                    code={
                        `num1 = 10\nnum2 = 2\nprint(num1 / num2) #outputs 5.0`
                    }
                ></Example>
            </Accordion>
            <Accordion
                title="// (floor divide)"
                sectionId="//_floor_division"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>Performs integer division (remainder is discarded and always result is always rounded down) between the values to the left and right of the operator.</p>
                <Example
                    code={
                        `print(4 // 2) #outputs 2`
                    }
                ></Example>
                <Example
                    code={
                        `num1 = 11\nnum2 = 2\nprint(num1 // num2) #outputs 5`
                    }
                ></Example>
            </Accordion>
            <Accordion
                title="% (modulo)"
                sectionId="%_modulo"
                pageId={props.pageId}
                click={(next: string) => {
                    props.onSectionChange(current, next);
                    setCurrent(next);
                }}
                current={current}
            >
                <p>Calculates the remainder of the division between the values to the left and right of the operator.</p>
                <Example
                    code={
                        `print(5 % 2) #outputs 1`
                    }
                ></Example>
                <Example
                    code={
                        `num1 = 5\nnum2 = 3\nprint(num1 % num2) #outputs 2`
                    }
                ></Example>
            </Accordion>
        </Fragment>
    );
};