import React, { useContext, useState } from "react";

import { UserContext } from "../context";

export const Login = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { token, setToken } = useContext(UserContext);

    const formSubmitHandler = (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        const genericErrorMessage =
            "Something went wrong! Please try again later.";

        fetch("http://localhost:3001/auth/login", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
            .then(async (response) => {
                setIsSubmitting(false);
                if (!response.ok) {
                    if (response.status === 400) {
                        setError("Please fill all the fields correctly!");
                    } else if (response.status === 401) {
                        setError("Invalid email and password combination.");
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
                        id="username"
                        placeholder="username"
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        id="password"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button disabled={isSubmitting} type="submit">{`${
                    isSubmitting ? "Signing In" : "Sign In"
                }`}</button>
            </form>
        </div>
    );
};
