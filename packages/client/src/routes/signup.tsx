import React from "react";
import { Link } from "react-router-dom";

export const SignUp = () => {
    const [values, setValues] = React.useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    });

    const handleChange = (fieldName: string) => (event: any) => {
        setValues({ ...values, [fieldName]: event.target.value });
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                    first_name: values.firstName,
                    last_name: values.lastName,
                }),
            });

            if (!res.ok) {
                return console.log("fetch error");
            }

            const data = await res.json();

            setValues({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
            });

            return;
        } catch (error) {
            return console.log("fetch error", error);
        }
    };

    return (
        <div>
            <h1>chi23-study</h1>
            <p>
                through these tasks we will compare students learning to code
                with and without copilot
            </p>
            <button
                onClick={(event) => {
                    setValues({
                        email: "testweb2@test.com",
                        password: "testweb",
                        firstName: "first_testweb",
                        lastName: "last_testweb",
                    });

                    handleSubmit(event);
                }}
            >
                register
            </button>

            <Link to="/">back to main</Link>
        </div>
    );
};
