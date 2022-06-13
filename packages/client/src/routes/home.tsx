import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Login } from "../components/login";
import { Register } from "../components/register";
import { UserContext } from "../context";
import { User } from "../types";

export const Home = () => {
    const { token, setToken } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User>({
        username: "",
        firstName: "",
        lastName: "",
    });

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
                    setLoading(false);
                } else {
                    setToken(null);
                    setLoading(false);
                }
            })
            .catch((error) => {
                setLoading(false);
            });
    }, [setToken]);

    useEffect(() => {
        verifyUser();
    }, [verifyUser]);

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

    const getUser = () => {
        fetch("http://localhost:3001/auth/me", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (response) => {
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                } else {
                    setUser({
                        username: "",
                        firstName: "",
                        lastName: "",
                    });
                }
            })
            .catch((error) => {
                console.log("/auth/me", error);
            });
    };

    if (!loading && token) {
        getUser();
    }

    return (
        <div>
            <h1>chi23-study</h1>
            <p>
                through these tasks we will compare students learning to code
                with and without copilot
            </p>

            {loading ? (
                <h1>Loading</h1>
            ) : token ? (
                <div>
                    <div>Welcome {user.firstName}</div>
                    <p>start coding:</p>
                    <Link to="/coding">start coding</Link>
                    <br />

                    <button onClick={logoutHandler}>Logout</button>
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
