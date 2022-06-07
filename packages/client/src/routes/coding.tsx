import React from "react";
import { Link } from "react-router-dom";

import { Editor } from "../components/editor";

export const Coding = () => {
    return (
        <div>
            <h1>chi23-editor</h1>
            <Editor />

            <Link to="/">Home</Link>
        </div>
    );
};
