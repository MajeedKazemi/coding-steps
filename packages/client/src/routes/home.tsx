import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <div>
            <h1>chi23-study</h1>
            <p>
                through these tasks we will compare students learning to code
                with and without copilot
            </p>

            <Link to="/coding">start coding</Link>
            <br />
            <Link to="/signup">sign up</Link>
        </div>
    );
};
