import cors from "cors";
import express from "express";

import { initLanguageService } from "./editor/intellisense";
import { initPythonShell } from "./editor/shell";

const app = express();
app.use(cors());

const port = 3001;

app.get("/ping", (req, res) => {
    res.json({ result: "pong" });
});

const server = app.listen(port, () => {
    console.log(`Express server listening at http://localhost:${port}`);
});

initLanguageService(server);
initPythonShell(server);
