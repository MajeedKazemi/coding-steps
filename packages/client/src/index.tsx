import "./userWorker";

import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Coding } from "./routes/coding";
import { Home } from "./routes/home";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("[index.html] missing root element");
const root = ReactDOM.createRoot(rootEl);

export const UserContext = React.createContext({
    token: null,
    setToken: (token: any) => {},
});

function App() {
    const [token, setToken] = useState(null);

    const value = useMemo(() => ({ token, setToken }), [token]);

    return (
        <UserContext.Provider value={value}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/coding" element={<Coding />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

root.render(<App />);
