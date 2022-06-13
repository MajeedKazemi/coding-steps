import "./userWorker";

import React, { useCallback, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Coding } from "./routes/coding";
import { Home } from "./routes/home";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("[index.html] missing root element");
const root = ReactDOM.createRoot(rootEl);

export const UserContext = React.createContext([{}, () => {}]);

function App() {
    const [state, setState] = useState({});

    return (
        <UserContext.Provider value={[state, setState]}>
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
