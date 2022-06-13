import { Button, Callout, FormGroup, InputGroup } from "@blueprintjs/core";
import React, { useContext, useState } from "react";

import { UserContext } from "..";

export const Register = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userContext, setUserContext] = useContext(UserContext) as any;

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
                        console.log(response);
                        const data = await response.json();
                        if (data.message)
                            setError(data.message || genericErrorMessage);
                    } else {
                        setError(genericErrorMessage);
                    }
                } else {
                    const data = await response.json();

                    setUserContext((oldValues: any) => {
                        console.log("auth/refreshToken - OK", oldValues);
                        console.log("auth/refreshToken - OK", data);

                        return { ...oldValues, token: data.token };
                    });
                }
            })
            .catch((error) => {
                console.log("auth/refreshToken - NOKEY", error);

                setIsSubmitting(false);
                setError(genericErrorMessage);
            });
    };

    return (
        <div>
            {error && <Callout intent="danger">{error}</Callout>}

            <form onSubmit={formSubmitHandler} className="auth-form">
                <FormGroup label="First Name" labelFor="firstName">
                    <InputGroup
                        id="firstName"
                        placeholder="First Name"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                    />
                </FormGroup>
                <FormGroup label="Last Name" labelFor="firstName">
                    <InputGroup
                        id="lastName"
                        placeholder="Last Name"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                    />
                </FormGroup>
                <FormGroup label="Username" labelFor="username">
                    <InputGroup
                        id="username"
                        type="username"
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                </FormGroup>
                <FormGroup label="Password" labelFor="password">
                    <InputGroup
                        id="password"
                        placeholder="Password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </FormGroup>
                <Button
                    intent="primary"
                    disabled={isSubmitting}
                    text={`${isSubmitting ? "Registering" : "Register"}`}
                    fill
                    type="submit"
                />
            </form>
        </div>
    );
};
