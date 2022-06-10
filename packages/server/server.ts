import "./utils/authenticate";
import "./utils/jwtStrategy";
import "./utils/localStrategy";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";

import { loginRouter } from "./routes/login-router";
import { pingRouter } from "./routes/ping";
import { initLanguageService } from "./sockets/editor/intellisense";
import { initPythonShell } from "./sockets/editor/shell";
import env from "./utils/env";

const port = process.env.PORT || 3001;

const corsOptions = {
    origin: (origin: any, callback: any) => {
        const whitelist = env.WHITELISTED_DOMAINS.split(",").map((d) =>
            d.trim()
        );

        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};

mongoose
    .connect(env.MONGODB_URI)
    .then((db) => {
        const app = express();

        app.use(cookieParser(env.COOKIE_SECRET));
        app.use(cors(corsOptions));
        app.use(passport.initialize());
        app.use(bodyParser.json());

        app.use("/auth/", loginRouter);
        app.use(pingRouter);

        const server = app.listen(port, () => {
            console.log(`Express server listening at http://localhost:${port}`);
        });

        initLanguageService(server);
        initPythonShell(server);
    })
    .catch((err) => {
        console.error("[Terminating] Error connecting to MongoDB: ", err);
    });
