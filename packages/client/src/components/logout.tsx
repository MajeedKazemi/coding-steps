import React, { useContext, useState } from "react";

import { UserContext } from "../context";

export const Logout = () => {
    const { token, setToken } = useContext(UserContext);

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

    return <button onClick={logoutHandler}>Logout</button>;
};
