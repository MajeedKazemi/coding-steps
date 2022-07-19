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
            <h1 className="doc-title">Hey Carl</h1>
        </Fragment>
    );
};