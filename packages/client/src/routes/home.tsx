import React, { useCallback, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "..";
import { Loader } from "../components/loader";
import { Login } from "../components/login";
import { Register } from "../components/register";

export const Home = () => {
    const [userContext, setUserContext] = useContext(UserContext) as any;

    const verifyUser = useCallback(() => {
        fetch("http://localhost:3001/auth/refreshToken", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then(async (response) => {
                if (response.ok) {
                    const data = await response.json();
                    console.log("refresh ok: ", data.token);

                    setUserContext((oldValues: any) => {
                        return { ...oldValues, token: data.token };
                    });
                } else {
                    console.log("inja?");
                    setUserContext((oldValues: any) => {
                        console.log("auth/refreshToken - NOKEY", oldValues);

                        return { ...oldValues, token: null };
                    });
                }
                // call refreshToken every 5 minutes to renew the authentication token.
                // setTimeout(verifyUser, 5 * 60 * 1000);
            })
            .catch((error) => {
                console.log("/auth/refreshToken", error);
            });
    }, [setUserContext]);

    useEffect(() => {
        verifyUser();
    }, [verifyUser]);

    console.log("userContext.token:", userContext.token);

    return (
        <div>
            <h1>chi23-study</h1>
            <p>
                through these tasks we will compare students learning to code
                with and without copilot
            </p>

            <Link to="/coding">start coding</Link>
            <br />

            {userContext.token === undefined ? (
                <div>
                    <h1>Login:</h1>
                    <Login />

                    <br />
                    <h1>Sign up:</h1>
                    <Register />
                </div>
            ) : userContext.token ? (
                <div>welcome</div>
            ) : (
                <Loader />
            )}
        </div>
    );
};
