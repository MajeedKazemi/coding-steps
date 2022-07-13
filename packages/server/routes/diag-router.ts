import express from "express";
import { DiagnosisModel } from "../models/diagnosis";

export const diagRouter = express.Router();

diagRouter.post("/error", (req, res, next) => {
    const error = new DiagnosisModel({
        date: req.body.date,
        message: req.body.message,
        type: "error",
    });
    error
        .save()
        .then(() => {
            res.sendStatus(200);
        })
        .catch(next);
});
