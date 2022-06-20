import express from "express";

import { UserTask } from "../models/user-task";
import { verifyUser } from "../utils/strategy";
import {
    AuthoringTask,
    getNextTask,
    getTaskFromTaskId,
    ModifyingTask,
    MultipleChoiceTask,
    TaskType,
} from "../tasks/tasks";

export const tasksRouter = express.Router();

tasksRouter.get("/started", verifyUser, (req, res, next) => {
    const userId = (req.user as any)._id;

    if (userId !== undefined) {
        UserTask.find({ userId, startedAt: { $exists: true } })
            .sort({ finishedAt: 1 })
            .then((userTasks) => {
                res.send({ tasks: userTasks });
            });
    }
});

tasksRouter.get("/next", verifyUser, (req, res, next) => {
    const userId = (req.user as any)._id;

    // TODO: search through all of the tasks that the user has completed and find the next one

    if (userId !== undefined) {
        UserTask.find({ userId, finishedAt: { $exists: true } })
            .sort({ finishedAt: 1 })
            .then((userTasks) => {
                res.send({ task: getNextTask(userTasks) });
            });
    }
});

tasksRouter.post("/start", verifyUser, (req, res, next) => {
    const userId = (req.user as any)._id;
    const { taskId, startedAt } = req.body;

    if (userId !== undefined && taskId !== undefined) {
        UserTask.findOne({ userId, taskId }).then((userTask) => {
            if (userTask) {
                if (userTask.data.attempts) {
                    userTask.data.attempts++;
                } else {
                    userTask.data.attempts = 2;
                }

                userTask.save((err, userTask) => {
                    if (err) {
                        res.statusCode = 500;
                        res.send(err);
                    } else {
                        res.send({ success: true, completed: true });
                    }
                });
            } else {
                const userTask = new UserTask({
                    userId,
                    taskId,
                    userTaskId: `${userId}_${taskId}`,
                    startedAt: startedAt,
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
    } else {
        res.statusCode = 500;
        res.send({ message: "missing userId or taskId" });
    }
});

tasksRouter.post("/submit", verifyUser, (req, res, next) => {
    const userId = (req.user as any)._id;
    const { taskId, finishedAt, data, code } = req.body;

    if (
        userId !== undefined &&
        taskId !== undefined &&
        finishedAt !== undefined &&
        data !== undefined &&
        code !== undefined
    ) {
        const task = getTaskFromTaskId(taskId);

        if (task instanceof AuthoringTask || task instanceof ModifyingTask) {
            const checkResult = task.checkCode(code);

            if (checkResult.passed) {
                UserTask.findOne({ userId, taskId }).then((userTask) => {
                    if (userTask) {
                        userTask.finishedAt = finishedAt;
                        userTask.data = data;

                        userTask.save((err, userTask) => {
                            if (err) {
                                res.statusCode = 500;
                                res.send(err);
                            } else {
                                res.send({
                                    success: true,
                                    completed: true,
                                });
                            }
                        });
                    } else {
                        res.statusCode = 500;
                        res.send({ message: "Usertask not found" });
                    }
                });
            } else {
                UserTask.findOne({ userId, taskId }).then((userTask) => {
                    if (userTask) {
                        if (userTask.data.incorrectSubmissions) {
                            userTask.data.incorrectSubmissions.append({
                                code,
                                message: checkResult.message,
                            });
                        } else {
                            userTask.data.incorrectSubmissions = [
                                {
                                    code,
                                    message: checkResult.message,
                                },
                            ];
                        }

                        userTask.save((err, userTask) => {
                            if (err) {
                                res.statusCode = 500;
                                res.send(err);
                            } else {
                                res.send({
                                    success: true,
                                    completed: false,
                                });
                            }
                        });
                    } else {
                        res.statusCode = 500;
                        res.send({
                            message: "UserTask not found",
                        });
                    }
                });
            }
        } else if (task instanceof MultipleChoiceTask) {
            const userTask = new UserTask({
                userId,
                taskId,
                data,
                userTaskId: `${userId}_${taskId}`,
            });

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
            res.send({ message: "task not found" });
        }
    } else {
        res.statusCode = 500;
        res.send({
            message: "missing userId or taskId or finishedAt or code or data",
        });
    }
});

tasksRouter.post("/update", verifyUser, (req, res, next) => {
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
                res.send({ message: "UserTask not found" });
            }
        });
    } else {
        res.statusCode = 500;
        res.send({ message: "missing userId or taskId" });
    }
});
