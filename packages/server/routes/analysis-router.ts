import express from "express";

import { TaskUserData } from "../data/data";
import { IUser } from "../models/user";

export const analysisRouter = express.Router();

analysisRouter.get("/get-aggregated-data/:taskId", async (req, res, next) => {
    const { taskId } = req.params;
    const adminUser = req.user as IUser;

    try {
        if (taskId !== undefined) {
            res.send({ data: TaskUserData[taskId] });
        }
    } catch (e) {
        console.log(e);
    }
});
