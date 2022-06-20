import * as express from "express";

export const pingRouter = express.Router();

pingRouter.get("/ping", (req, res) => {
    res.json({ result: "pong" });
});
