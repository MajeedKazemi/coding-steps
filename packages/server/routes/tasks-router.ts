import express from "express";

import { UserTask } from "../models/user-task";
import { verifyUser } from "../utils/strategy";

export const taskRouter = express.Router();

taskRouter.get("/all-user-tasks", verifyUser, (req, res, next) => {
    const userId = (req.user as any)._id;

    if (userId !== undefined) {
        UserTask.find({ userId }).then((userTasks) => {
            res.send({ tasks: userTasks });
        });
    }
});

taskRouter.post("/add-user-task", verifyUser, (req, res, next) => {
    const userId = (req.user as any)._id;
    const taskId = req.body.taskId;

    if (userId !== undefined && taskId !== undefined) {
        const userTask = new UserTask({
            userId,
            taskId,
            userTaskId: `${userId}_${taskId}`,
            startedAt: req.body.startedAt,
            data: req.body.data ? req.body.data : {},
        });

        userTask.save((err, userTask) => {
            if (err) {
                res.statusCode = 500;
                res.send(err);
            } else {
                res.send({ success: true });
            }
        });
    }
});

taskRouter.post("/update-user-task", verifyUser, (req, res, next) => {
    const userId = (req.user as any)._id;
    const taskId = req.body.taskId;

    if (userId !== undefined && taskId !== undefined) {
        UserTask.findOne({ userId, taskId }).then((userTask) => {
            if (userTask) {
                userTask.data = req.body.data ? req.body.data : {};
                userTask.finishedAt = req.body.finishedAt;

                userTask.save((err, userTask) => {
                    if (err) {
                        res.statusCode = 500;
                        res.send(err);
                    } else {
                        res.send({ success: true });
                    }
                });
            } else {
                res.statusCode = 500;
                res.send({});
            }
        });
    }
});
