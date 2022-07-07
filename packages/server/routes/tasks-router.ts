import express from "express";

import { IUser } from "../models/user";
import { UserTask } from "../models/user-task";
import {
    AuthoringTask,
    getNextTask,
    getTaskFromTaskId,
    getTaskSequenceFromTaskId,
    ModifyingTask,
    MultipleChoiceTask,
    ShortAnswerTask,
} from "../tasks/tasks";
import { verifyUser } from "../utils/strategy";

export const tasksRouter = express.Router();

// get next task -> could be any type of task
tasksRouter.get("/next", verifyUser, (req, res, next) => {
    const userId = (req.user as IUser)._id;

    if (userId !== undefined) {
        // searches through all of the tasks that the user has completed and find the next one (using their sequence number)
        UserTask.find({
            userId,
            completed: true,
        })
            .sort({ sequence: 1 })
            .then((userTasks) => {
                res.send({ task: getNextTask(userTasks) });
            });
    }
});

// starts the timer for a task -> creates a user-task for the user and sets the startedAt
tasksRouter.post("/start", verifyUser, (req, res, next) => {
    const userId = (req.user as IUser)._id;
    const { taskId, startedAt } = req.body;

    if (userId !== undefined && taskId !== undefined) {
        const task = getTaskFromTaskId(taskId);

        if (task !== undefined) {
            UserTask.findOne({ userId, taskId }).then((userTask) => {
                if (userTask) {
                    userTask.save((err, userTask) => {
                        // have started before:

                        if (err) {
                            res.statusCode = 500;
                            res.send(err);
                        } else {
                            res.send({
                                success: true,
                                canContinue: true,
                                startedAt: userTask.startedAt,
                                beingGraded: userTask.beingGraded,
                                checkingTime: calcCheckingTime(
                                    userTask.submissions
                                ),
                            });
                        }
                    });
                } else {
                    const userTask = new UserTask({
                        sequence: getTaskSequenceFromTaskId(taskId),
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
                            res.send({ success: true, continue: false });
                        }
                    });
                }
            });
        } else {
            res.statusCode = 500;
            res.send({ success: false, error: "Invalid taskId" });
        }
    } else {
        res.statusCode = 500;
        res.send({ success: false, message: "missing userId or taskId" });
    }
});

// submits the task -> for author/modify tasks: pauses the timer and saves the data
// can be called with /finish to also mark the task as completed and go to the next task
tasksRouter.post("/eval-code", verifyUser, (req, res, next) => {
    const userId = (req.user as IUser)._id;
    const { taskId, submittedAt, data } = req.body;

    if (userId !== undefined && taskId !== undefined) {
        const task = getTaskFromTaskId(taskId);

        if (task instanceof AuthoringTask || task instanceof ModifyingTask) {
            if (data !== undefined && data.code === undefined) {
                res.statusCode = 500;
                res.send({ message: `Missing code: ${data.code}` });
            }

            const checkResult = task.checkCode(data.code);

            if (checkResult.passed) {
                UserTask.findOne({ userId, taskId }).then((userTask) => {
                    if (userTask) {
                        userTask.beingGraded = true;

                        userTask.submissions.push({
                            code: data.code,
                            submittedAt: submittedAt,
                        });

                        userTask.save((err, userTask) => {
                            if (err) {
                                res.statusCode = 500;
                                res.send(err);
                            } else {
                                res.send({
                                    success: true,
                                });
                            }
                        });
                    } else {
                        res.statusCode = 500;
                        res.send({ message: "UserTask not found" });
                    }
                });
            }
        } else {
            res.statusCode = 500;
            res.send({ message: `No task was found with taskId: ${taskId}` });
        }
    } else {
        res.statusCode = 500;
        res.send({ message: `missing userId: ${userId} or taskId: ${taskId}` });
    }
});

// checks the status of the task submission
tasksRouter.get("/grading-status/:taskId", verifyUser, (req, res, next) => {
    const userId = (req.user as IUser)._id;
    const taskId = req.params.taskId;

    if (userId !== undefined && taskId !== undefined) {
        const task = getTaskFromTaskId(taskId);

        if (task instanceof AuthoringTask || task instanceof ModifyingTask) {
            UserTask.findOne({ userId, taskId }).then((userTask) => {
                if (userTask) {
                    res.send({
                        success: true,
                        passed: userTask.passed,
                        completed: userTask.completed,
                        beingGraded: userTask.beingGraded,
                        checkingTime: calcCheckingTime(userTask.submissions),
                    });
                } else {
                    res.statusCode = 500;
                    res.send({ message: "UserTask not found" });
                }
            });
        } else {
            res.statusCode = 500;
            res.send({ message: `No task was found with taskId: ${taskId}` });
        }
    } else {
        res.statusCode = 500;
        res.send({ message: `missing userId: ${userId} or taskId: ${taskId}` });
    }
});

// get all tasks that should be graded by the admin
tasksRouter.get("/not-graded", verifyUser, (req, res, next) => {
    if ((req.user as IUser).role === "admin") {
        UserTask.find({ beingGraded: true })
            .sort({ startedAt: 1 })
            .then((userTasks) => {
                res.send({
                    success: true,
                    submissions: userTasks
                        .map((userTask) => {
                            const task = getTaskFromTaskId(userTask.taskId);

                            if (userTask.submissions.length > 0) {
                                const index = userTask.submissions.length - 1;

                                return {
                                    index,
                                    id: `${userTask.userTaskId}-${index}`,
                                    userId: userTask.userId,
                                    taskId: userTask.taskId,
                                    taskTitle: task?.title,
                                    taskType: task?.type,
                                    code: userTask.submissions[index].code,
                                    submittedAt:
                                        userTask.submissions[index].submittedAt,
                                };
                            }
                        })
                        .filter((submission) => submission !== undefined)
                        .sort(
                            (a: any, b: any) => a.submittedAt - b.submittedAt
                        ),
                });
            });
    } else {
        res.statusCode = 500;
        res.send({ success: false, message: "Not authorized" });
    }
});

// finish task by the user
// either for a multiple-choice question, or if the user wants to simply go to the next task (in the latter case, it should be accompanied with a /grade request)
tasksRouter.post("/submit", verifyUser, (req, res, next) => {
    const userId = (req.user as IUser)._id;
    const { taskId, submittedAt, data } = req.body;

    if (userId !== undefined && taskId !== undefined) {
        const task = getTaskFromTaskId(taskId);

        if (task instanceof AuthoringTask || task instanceof ModifyingTask) {
            UserTask.findOne({ userId, taskId }).then((userTask) => {
                if (userTask) {
                    userTask.finishedAt = submittedAt;
                    userTask.completed = true;
                    userTask.beingGraded = true;

                    userTask.submissions.push({
                        code: data.code,
                        submittedAt: submittedAt,
                    });

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
                    res.send({ message: "UserTask not found" });
                }
            });
        } else if (
            task instanceof MultipleChoiceTask ||
            task instanceof ShortAnswerTask
        ) {
            const { startedAt } = req.body;

            const userTask = new UserTask({
                sequence: getTaskSequenceFromTaskId(taskId),
                userTaskId: `${userId}_${taskId}`,
                userId,
                taskId,
                startedAt: startedAt,
                finishedAt: submittedAt,
                completed: true,
                data: data,
            });

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
            res.send({ message: `No task was found with taskId: ${taskId}` });
        }
    } else {
        res.statusCode = 500;
        res.send({ message: `missing userId: ${userId} or taskId: ${taskId}` });
    }
});

// update task and set submitted to false, and passed to true or false
// from admin panel
tasksRouter.post("/set-grade", verifyUser, (req, res, next) => {
    if ((req.user as IUser).role === "admin") {
        const { userId, taskId, passed, submittedAt, checkedAt, index } =
            req.body;

        if (userId !== undefined && taskId !== undefined) {
            const task = getTaskFromTaskId(taskId);

            if (
                task instanceof AuthoringTask ||
                task instanceof ModifyingTask
            ) {
                UserTask.findOne({ userId, taskId }).then((userTask) => {
                    if (userTask) {
                        userTask.passed = passed;
                        userTask.beingGraded = false;
                        userTask.submissions[index] = {
                            ...userTask.submissions[index],
                            checkedAt,
                        };

                        if (passed) {
                            userTask.completed = true;
                            userTask.finishedAt = submittedAt;
                        }

                        userTask.save((err, userTask) => {
                            if (err) {
                                res.statusCode = 500;
                                res.send(err);
                            } else {
                                res.send({
                                    success: true,
                                });
                            }
                        });
                    } else {
                        res.statusCode = 500;
                        res.send({ message: "UserTask not found" });
                    }
                });
            } else {
                res.statusCode = 500;
                res.send({
                    message: `No task was found with taskId: ${taskId}`,
                });
            }
        } else {
            res.statusCode = 500;
            res.send({
                message: `missing userId: ${userId} or taskId: ${taskId}`,
            });
        }
    } else {
        res.statusCode = 500;
        res.send({ message: "Not authorized." });
    }
});

const calcCheckingTime = (
    submissions: Array<{
        code: string;
        submittedAt: Date;
        checkedAt?: Date;
    }>
) =>
    submissions.reduce((acc, submission) => {
        return submission.checkedAt
            ? acc +
                  (new Date(submission.checkedAt).getTime() -
                      new Date(submission.submittedAt).getTime())
            : acc;
    }, 0);
