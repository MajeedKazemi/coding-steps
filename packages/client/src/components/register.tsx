import React, { useContext, useState } from "react";

import { AuthContext } from "../context";
import { Button } from "./button";
import { Input } from "./input";

export const Register = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setContext } = useContext(AuthContext);

    const formSubmitHandler = (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        const genericErrorMessage =
            "Something went wrong! Please try again later.";

        fetch("http://localhost:3001/auth/signup", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName,
                lastName,
                username,
                password,
            }),
        })
            .then(async (response) => {
                setIsSubmitting(false);
                if (!response.ok) {
                    if (response.status === 400) {
                        setError("Please fill all the fields correctly!");
                    } else if (response.status === 401) {
                        setError("Invalid username and password combination.");
                    } else if (response.status === 500) {
                        const data = await response.json();
                        if (data.message)
                            setError(data.message || genericErrorMessage);
                    } else {
                        setError(genericErrorMessage);
                    }
                } else {
                    const data = await response.json();

                    setContext({ token: data.token, user: data.user });
                }
            })
            .catch((error) => {
                setIsSubmitting(false);
                setError(genericErrorMessage);

                setContext({ token: null, user: null });
            });
    };

    return (
        <form onSubmit={formSubmitHandler} className="mb-md">
            <span className="section-title">Register</span>
            <Input
                type="username"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
            <Input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <Input
                type="text"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
            />
            <Input
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
            />

            <Button>{`${isSubmitting ? "Registering" : "Register"}`}</Button>
        </form>
    );
};
