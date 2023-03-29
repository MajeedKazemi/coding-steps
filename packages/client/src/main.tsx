import "./index.css";
import "./userWorker";

import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import ReactDOM from "react-dom/client";
import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";

import { authRefresh, logError } from "./api/api";
import { connectSocket } from "./api/python-shell";
import { AuthContext, SocketContext } from "./context";
import { AdminPage } from "./routes/admin-page";
import { AnalysisBaselinePage } from "./routes/analysis-baseline";
import { AnalysisCodexPage } from "./routes/analysis-codex";
import { AnalysisCodexListPage } from "./routes/analysis-codex-list-page";
import { GraderPage } from "./routes/grader-page";
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
    let { socket, setSocket } = useContext(SocketContext);
    let location = useLocation();

    const verifyUser = useCallback(() => {
        setLoading(true);

        authRefresh()
            .then(async (response) => {
                if (response.ok) {
                    const data = await response.json();

                    setContext({ token: data.token, user: data.user });
                    setSocket(connectSocket(data.token));
                } else {
                    logError(response.toString());
                }

                setLoading(false);
            })
            .catch((error) => {
                logError(error.toString());
                setLoading(false);
            });

        setTimeout(verifyUser, 60 * 5 * 1000);
    }, [setContext, setSocket]);

    useEffect(() => {
        verifyUser();
    }, [verifyUser]);

    if (loading && !context?.token) return <h1>Loading</h1>;
    else if (!context?.token) {
        return <Navigate to="/" state={{ from: location }} replace />;
    } else return children;
}

function App() {
    const [context, setContext] = useState(null);
    const [socket, setSocket] = useState(null);

    const contextVal = useMemo(
        () => ({ context: context, setContext: setContext }),
        [context]
    ) as any;

    const socketVal = useMemo(
        () => ({ socket: socket, setSocket: setSocket }),
        [socket]
    ) as any;

    return (
        <SocketContext.Provider value={socketVal}>
            <AuthContext.Provider value={contextVal}>
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
                        <Route
                            path="/grader"
                            element={
                                <RequireAuth role="admin">
                                    <GraderPage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/analysis-list"
                            element={<AnalysisCodexListPage />}
                        />
                        <Route
                            path="/analysis"
                            element={<AnalysisCodexPage />}
                        />
                        <Route
                            path="/analysis-base"
                            element={<AnalysisBaselinePage />}
                        />
                    </Routes>
                </BrowserRouter>
            </AuthContext.Provider>
        </SocketContext.Provider>
    );
}

root.render(<App />);
