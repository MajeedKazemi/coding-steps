import { Button } from "@blueprintjs/core";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Loader } from "../components/loader";
import { Login } from "../components/login";
import { Register } from "../components/register";
import { UserContext } from "../context";

export const Home = () => {
    const { token, setToken } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    const logoutHandler = () => {
        fetch("http://localhost:3001/auth/logout", {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }).then(async (response) => {
            setToken(null);
        });
    };

    const verifyUser = useCallback(() => {
        setLoading(true);

        fetch("http://localhost:3001/auth/refreshToken", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then(async (response) => {
                if (response.ok) {
                    const data = await response.json();
                    setToken(data.token);
                } else {
                    setToken(null);
                }
                // call refreshToken every 5 minutes to renew the authentication token.
                setTimeout(verifyUser, 5 * 60 * 1000);
                setLoading(false);
            })
            .catch((error) => {
                console.log("/auth/refreshToken", error);
                setLoading(false);
            });
    }, [setToken]);

    useEffect(() => {
        verifyUser();
    }, [verifyUser]);

    return (
        <div>
            <h1>chi23-study</h1>
            <p>
                through these tasks we will compare students learning to code
                with and without copilot
            </p>

            <Link to="/coding">start coding</Link>
            <br />

            {loading ? (
                <Loader />
            ) : token ? (
                <div>
                    <div>welcomeefee</div>

                    <Button
                        text="Logout"
                        onClick={logoutHandler}
                        minimal
                        intent="primary"
                    />
                </div>
            ) : (
                <div>
                    <h1>Login:</h1>
                    <Login />

                    <br />
                    <h1>Sign up:</h1>
                    <Register />
                </div>
            )}
        </div>
    );
};
