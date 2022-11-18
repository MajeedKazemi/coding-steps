import express from "express";

import { IUser } from "../models/user";
import { UserTaskModel } from "../models/user-task";
import { AuthoringTask, getTaskFromTaskId, ModifyingTask } from "../tasks/tasks";
import { BaselineUserIds, CopilotUserIds } from "../tasks/users";
import { verifyUser } from "../utils/strategy";

export const adminRouter = express.Router();

// get all tasks that should be graded by the admin
adminRouter.get("/not-graded", verifyUser, (req, res, next) => {
    if ((req.user as IUser).role === "admin") {
        UserTaskModel.find({ beingGraded: true }).then((userTasks) => {
            res.send({
                success: true,
                submissions: userTasks
                    .map((userTask) => {
                        const task = getTaskFromTaskId(userTask.taskId);

                        if (userTask.submissions.length > 0) {
                            const index = userTask.submissions.length - 1;
                            let solution = "";

                            if (
                                task instanceof AuthoringTask ||
                                task instanceof ModifyingTask
                            ) {
                                solution = task.solution;
                            }

                            return {
                                index,
                                id: `${userTask.userTaskId}-${index}`,
                                userId: userTask.userId,
                                taskId: userTask.taskId,
                                taskType: task?.type,
                                solution,
                                startedAt: userTask.startedAt,
                                submissionCount: userTask.submissions.length,
                                code: userTask.submissions[index].code,
                                taskDescription: task?.description,
                                submittedAt: new Date(
                                    userTask.submissions[index].submittedAt
                                ),
                            };
                        }
                    })
                    .filter((submission) => submission !== undefined)
                    .splice(0, 25)
                    .sort((b, a) => {
                        return (
                            (b?.submittedAt?.getTime()
                                ? b?.submittedAt?.getTime()
                                : 0) -
                            (a?.submittedAt?.getTime()
                                ? a?.submittedAt?.getTime()
                                : 0)
                        );
                    }),
            });
        });
    } else {
        res.statusCode = 500;
        res.send({ success: false, message: "Not authorized" });
    }
});

// update task and set submitted to false, and passed to true or false
// from admin panel
adminRouter.post("/set-grade", verifyUser, (req, res, next) => {
    if ((req.user as IUser).role === "admin") {
        const {
            userId,
            taskId,
            passed,
            submittedAt,
            checkedAt,
            index,
            feedback,
        } = req.body;

        if (userId !== undefined && taskId !== undefined) {
            const task = getTaskFromTaskId(taskId);

            if (
                task instanceof AuthoringTask ||
                task instanceof ModifyingTask
            ) {
                UserTaskModel.findOne({ userId, taskId }).then((userTask) => {
                    if (userTask) {
                        userTask.passed = passed;
                        userTask.beingGraded = false;
                        userTask.submissions[index] = {
                            ...userTask.submissions[index],
                            checkedAt,
                            feedback,
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

adminRouter.get(
    "/get-final-submissions/:taskId",
    verifyUser,
    (req, res, next) => {
        if ((req.user as IUser).role === "admin") {
            const { taskId } = req.params;
            const adminUser = req.user as IUser;

            if (taskId !== undefined) {
                const task = getTaskFromTaskId(taskId);

                if (
                    task instanceof AuthoringTask ||
                    task instanceof ModifyingTask
                ) {
                    const userIds = [...BaselineUserIds, ...CopilotUserIds];

                    let starterCode = "";

                    if (task instanceof ModifyingTask) {
                        starterCode = task.starterCode;
                    }

                    UserTaskModel.find({
                        taskId,
                        userId: { $in: userIds },
                    }).then((userTasks) => {
                        res.send({
                            success: true,
                            taskDescription: task.description,
                            solution: task.solution,
                            submissions: shuffle(
                                userTasks.map((userTask) => {
                                    let code = "";

                                    if (userTask.submissions.length > 0) {
                                        code =
                                            userTask.submissions[
                                                userTask.submissions.length - 1
                                            ].code;
                                    }

                                    let adminGrade = undefined;

                                    for (const finalGrade of userTask.finalGrades) {
                                        if (
                                            finalGrade.grader ===
                                                adminUser.username &&
                                            finalGrade.grade !== undefined
                                        ) {
                                            adminGrade = finalGrade;
                                        }
                                    }

                                    const feedbacks = userTask.submissions.map(
                                        (submission) => submission.feedback
                                    );

                                    feedbacks.splice(-1);

                                    return {
                                        id: userTask.userTaskId,
                                        userId: userTask.userId,
                                        taskId: userTask.taskId,
                                        notModified: starterCode === code,
                                        code: code,
                                        feedbacks: feedbacks.filter(
                                            (feedback) =>
                                                feedback !== undefined &&
                                                feedback !== ""
                                        ),
                                        graded: adminGrade !== undefined,
                                        gradedGrade: adminGrade?.grade,
                                        receivedDirectHint:
                                            adminGrade?.receivedDirectHint ===
                                            true,
                                    };
                                })
                            ),
                        });
                    });
                }
            }
        } else {
            res.statusCode = 500;
            res.send({ message: "Not authorized." });
        }
    }
);

adminRouter.post("/set-final-grade", verifyUser, (req, res, next) => {
    if ((req.user as IUser).role === "admin") {
        const { userId, taskId, grade, receivedDirectHint } = req.body;

        if (userId !== undefined && taskId !== undefined) {
            const task = getTaskFromTaskId(taskId);

            if (
                task instanceof AuthoringTask ||
                task instanceof ModifyingTask
            ) {
                UserTaskModel.findOne({ userId, taskId }).then((userTask) => {
                    if (userTask) {
                        userTask.finalGrades = [
                            ...userTask.finalGrades,
                            {
                                grader: (req.user as IUser).username,
                                grade,
                                receivedDirectHint,
                            },
                        ];

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
        }
    } else {
        res.statusCode = 500;
        res.send({ message: "Not authorized." });
    }
});

function shuffle(array: any[]): any[] {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}

// const runOnce = () => {
//     const finalGrade = [
//         { grader: "majeed", grade: 0, receivedDirectHint: false },
//         { grader: "justinchow", grade: 0, receivedDirectHint: false },
//         { grader: "carlma", grade: 0, receivedDirectHint: false },
//     ];

//     for (const task of CodingTasks) {
//         if (task instanceof ModifyingTask) {
//             UserTaskModel.find({
//                 taskId: task.id,
//                 userId: { $in: [...BaselineUserIds, ...CopilotUserIds] },
//             }).then((userTasks) => {
//                 for (const userTask of userTasks) {
//                     let finalSubmission = "";

//                     if (userTask.submissions.length > 0) {
//                         finalSubmission =
//                             userTask.submissions[
//                                 userTask.submissions.length - 1
//                             ].code;
//                     }

//                     if (
//                         finalSubmission === "" ||
//                         finalSubmission === task.starterCode
//                     ) {
//                         userTask.finalGrades = finalGrade;
//                         userTask.save();
//                         console.log("updated: ", userTask.userTaskId);
//                     }
//                 }
//             });
//         }
//     }
// };

// runOnce();
