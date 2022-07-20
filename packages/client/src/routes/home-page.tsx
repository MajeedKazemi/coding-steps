import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "../components/button";
import { Layout } from "../components/layout";
import { Login } from "../components/login";
import { Register } from "../components/register";
import { AuthContext } from "../context";

export const HomePage = () => {
    const { context } = useContext(AuthContext);
    const [showRegister, setShowRegister] = useState(false);

    return (
        <Layout>
            <div className="container">
                <main className="card">
                    {context?.token ? (
                        <div className="m-md">
                            <h1>Welcome to Coding Steps!</h1>
                            <p>
                                Hello {context?.user?.firstName}, welcome to
                                Coding Steps where you will be learning Python
                                by solving programming tasks.
                            </p>
                            <p>
                                To start learning and working on the programming
                                tasks click start:
                            </p>
                            <Link to="/tasks" className="text-no-decoration">
                                <Button type="block" class="text-sm">
                                    Start Coding
                                </Button>
                            </Link>
                            <br />
                        </div>
                    ) : (
                        // can show their name
                        // a component showing how many tasks they have completed

                        <div className="card-row">
                            <div className="left">
                                {showRegister ? (
                                    <div className="vertical-space-between">
                                        <Register />
                                        <div>
                                            Already have an account?{" "}
                                            <Button
                                                type="link"
                                                onClick={() => {
                                                    setShowRegister(false);
                                                }}
                                            >
                                                Login
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="vertical-space-between">
                                        <Login />
                                        <div>
                                            Need an account?
                                            <Button
                                                type="link"
                                                onClick={() => {
                                                    setShowRegister(true);
                                                }}
                                            >
                                                Register
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <section className="right">
                                <h2 className="card-title">Coding Steps</h2>
                                <p className="mb-md">
                                    Learn Python and introductory programming
                                    concepts by solving programming tasks step
                                    by step
                                </p>

                                <p className="text-sm">
                                    This tool is part of a research study
                                    conducted by the University of Toronto. If
                                    you have any questions or concerns, please{" "}
                                    <a href="mailto:majeed@dgp.toronto.edu">
                                        email
                                    </a>{" "}
                                    us.
                                </p>
                                <p className="text-sm">
                                    Powered by{" "}
                                    <a href="https://openai.com/blog/openai-codex/">
                                        OpenAI Codex
                                    </a>
                                    .
                                </p>
                            </section>
                        </div>
                    )}
                </main>
            </div>
        </Layout>
    );
};
