import "./userWorker";

import React, { createContext, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Coding } from "./routes/coding";
import { Home } from "./routes/home";
import { SignUp } from "./routes/signup";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("[index.html] missing root element");
const root = ReactDOM.createRoot(rootEl);

export const UserContext = createContext({});

function App() {
    const [loading, setLoading] = React.useState(true);
    const [userSession, setUserSession] = React.useState(undefined);

    useEffect(() => {
        const fetchUserAuth = async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/authenticated");

                if (!res.ok) {
                    throw new Error(res.statusText);
                }

                setUserSession(await res.json());
            } catch (error) {
                console.error("There was a fetch error: ", error);
            }

            setLoading(false);
        };

        fetchUserAuth();
    }, []);

    return (
        <UserContext.Provider value={{ userSession }}>
            <BrowserRouter>
                {loading ? (
                    <p>loading...</p>
                ) : (
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/coding" element={<Coding />} />
                        <Route path="/signup" element={<SignUp />} />
                    </Routes>
                )}
            </BrowserRouter>
        </UserContext.Provider>
    );
}

root.render(<App />);
