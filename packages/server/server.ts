import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";

import { loginRouter } from "./routes/login";
import { pingRouter } from "./routes/ping";
import { initLanguageService } from "./sockets/editor/intellisense";
import { initPythonShell } from "./sockets/editor/shell";

config();
const port = process.env.PORT || 3001;

const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
};

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/chi23_webapp");

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(loginRouter);
app.use(pingRouter);

const server = app.listen(port, () => {
    console.log(`Express server listening at http://localhost:${port}`);
});

initLanguageService(server);
initPythonShell(server);
