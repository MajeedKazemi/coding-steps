import "./userWorker";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Coding } from "./routes/coding";
import { Home } from "./routes/home";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("[index.html] missing root element");
const root = ReactDOM.createRoot(rootEl);

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coding" element={<Coding />} />
        </Routes>
    </BrowserRouter>
);
