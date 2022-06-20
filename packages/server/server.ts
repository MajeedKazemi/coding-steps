import "./utils/strategy";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import Session from "express-session";
import mongoose from "mongoose";
import passport from "passport";

import { codexRouter } from "./routes/codex-router";
import { loginRouter } from "./routes/login-router";
import { pingRouter } from "./routes/ping-router";
import { tasksRouter } from "./routes/tasks-router";
import { initLanguageService } from "./sockets/intellisense";
import { initPythonShell } from "./sockets/python-shell";
import env from "./utils/env";

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

        app.use(cors(corsOptions));
        app.use(
            Session({
                secret: env.COOKIE_SECRET,
                resave: false,
                saveUninitialized: false,
            })
        );

        app.use(cookieParser(env.COOKIE_SECRET));
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(bodyParser.json());

        app.use("/auth/", loginRouter);
        app.use("/api/tasks/", tasksRouter);
        app.use("/api/codex/", codexRouter);
        app.use(pingRouter);

        const server = app.listen(env.PORT, () => {
            console.log(
                `Express server listening at http://localhost:${env.PORT}`
            );
        });

        initLanguageService(server);
        initPythonShell(server);
    })
    .catch((err) => {
        console.error("[Terminating] Error connecting to MongoDB: ", err);
    });
