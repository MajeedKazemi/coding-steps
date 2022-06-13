import { Spinner } from "@blueprintjs/core";
import React from "react";

export const Loader = () => {
    return (
        <div className="loader">
            <Spinner size={50} />
        </div>
    );
};
