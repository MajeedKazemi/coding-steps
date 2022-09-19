import express from "express";

import { AuthoringTask, CodingTasks, ModifyingTask, MultipleChoiceTask } from "../tasks/tasks";

export const metaRouter = express.Router();

metaRouter.get("/all-tasks", (req, res, next) => {
    const tasks = [];

    for (const task of CodingTasks) {
        if (task instanceof AuthoringTask) {
            tasks.push({
                id: task.id,
                type: "authoring",
                description: task.description.replace(/<[^>]*>/g, ""),
                topic: task.topic,
                stage: task.stage,
            });
        } else if (task instanceof ModifyingTask) {
            tasks.push({
                id: task.id,
                type: "modifying",
                description: task.description.replace(/<[^>]*>/g, ""),
                topic: task.topic,
                stage: task.stage,
                starterCode: task.starterCode,
            });
        } else if (task instanceof MultipleChoiceTask) {
            tasks.push({
                id: task.id,
                type: "multiple-choice",
                answer: task.answer,
                topic: task.topic,
                stage: task.stage,
            });
        }
    }

    res.send({ tasks });
});
