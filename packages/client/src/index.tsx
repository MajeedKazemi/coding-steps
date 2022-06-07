import "./userWorker";

import React from "react";
import ReactDOM from "react-dom/client";

import { Editor } from "./components/Editor";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("[index.html] missing root element");
const root = ReactDOM.createRoot(rootEl);

root.render(<Editor />);
