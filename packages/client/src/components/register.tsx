import React, { useContext, useState } from "react";

import { UserContext } from "../context";

export const Register = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { token, setToken } = useContext(UserContext);

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

                    setToken(data.token);
                }
            })
            .catch((error) => {
                setIsSubmitting(false);
                setError(genericErrorMessage);
                setToken(null);
            });
    };

    return (
        <div>
            <form onSubmit={formSubmitHandler} className="auth-form">
                <div>
                    <input
                        id="firstName"
                        placeholder="First Name"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                    />
                </div>
                <div>
                    <input
                        id="lastName"
                        placeholder="Last Name"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                    />
                </div>
                <div>
                    <input
                        id="username"
                        type="username"
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                </div>
                <div>
                    <input
                        id="password"
                        placeholder="Password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <button disabled={isSubmitting} type="submit">{`${
                    isSubmitting ? "Registering" : "Register"
                }`}</button>
            </form>
        </div>
    );
};
