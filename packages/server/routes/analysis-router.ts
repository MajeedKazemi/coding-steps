import express from "express";

import { TaskUserData, UserTaskData } from "../data/data";

export const analysisRouter = express.Router();

analysisRouter.get("/agg-data-per-task/:taskId", async (req, res, next) => {
    const { taskId } = req.params;

    try {
        if (taskId !== undefined) {
            res.send({ data: TaskUserData[taskId] });
        }
    } catch (e) {
        console.log(e);
    }
});

analysisRouter.get("/agg-data-per-user/:userId", async (req, res, next) => {
    const { userId } = req.params;

    try {
        if (userId !== undefined) {
            res.send({ data: UserTaskData[userId] });
        }
    } catch (e) {
        console.log(e);
    }
});

analysisRouter.get("/agg-data-keys", async (req, res, next) => {
    try {
        res.send({
            tasks: Object.keys(TaskUserData),
            users: Object.keys(UserTaskData),
        });
    } catch (e) {
        console.log(e);
    }
});
