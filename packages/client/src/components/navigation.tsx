import React, { useContext } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/coding-steps-logo.png";
import { AuthContext } from "../context";
import { Button } from "./button";

interface NavigationBarProps {
    loading?: boolean;
}

export const NavigationBar = (props: NavigationBarProps) => {
    const { token, setToken } = useContext(AuthContext);

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

    return (
        <header className="navbar">
            <Link to="/" className="text-no-decoration">
                <div className="navbar-logo-container">
                    <img
                        className="navbar-logo"
                        src={logo}
                        alt="lines depicting steps "
                    ></img>
                    <h1 className="logo-type">Coding Steps</h1>
                </div>
            </Link>
            <div>
                {!props.loading && token ? (
                    <Button icon="logout" onClick={logoutHandler}>
                        Logout
                    </Button>
                ) : null}
            </div>
        </header>
    );
};
