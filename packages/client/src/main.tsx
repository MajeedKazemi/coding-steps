import "./index.css";
import "./userWorker";

import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";

import { authRefresh } from "./api/api";
import { AuthContext } from "./context";
import { AdminPage } from "./routes/admin-page";
import { HomePage } from "./routes/home-page";
import { TasksPage } from "./routes/tasks-page";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("[index.html] missing root element");
const root = ReactDOM.createRoot(rootEl);

function RequireAuth({
    children,
    role,
}: {
    children: JSX.Element;
    role: "any" | "user" | "admin";
}) {
    const [loading, setLoading] = useState(true);
    let { context, setContext } = useContext(AuthContext);
    let location = useLocation();

    const verifyUser = useCallback(() => {
        setLoading(true);
        authRefresh()
            .then(async (response) => {
                if (response.ok) {
                    const data = await response.json();

                    setContext({ token: data.token, user: data.user });
                    setLoading(false);
                } else {
                    setContext({ token: null, user: null });
                    setLoading(false);
                }
            })
            .catch((error) => {
                setLoading(false);
            });
    }, [setContext]);

    useEffect(() => {
        verifyUser();
    }, [verifyUser]);

    if (loading) return <h1>Loading</h1>;
    else if (!context?.token) {
        return <Navigate to="/" state={{ from: location }} replace />;
    } else return children;
}

function App() {
    const [context, setContext] = useState(null);
    const value = useMemo(
        () => ({ context: context, setContext: setContext }),
        [context]
    ) as any;

    return (
        <AuthContext.Provider value={value}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/tasks"
                        element={
                            <RequireAuth role="any">
                                <TasksPage />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <RequireAuth role="admin">
                                <AdminPage />
                            </RequireAuth>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

root.render(<App />);
