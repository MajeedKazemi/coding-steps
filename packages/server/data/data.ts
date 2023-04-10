import { baselineData } from "./aggregated-data-baseline";
import { codexData } from "./aggregated-data-codex";

export const TaskUserDataCodex: any = {};
export const UserTaskDataCodex: any = {};

for (const key of Object.keys(codexData)) {
    const [taskId, userId] = key.split("_");

    if (TaskUserDataCodex[taskId] === undefined) {
        TaskUserDataCodex[taskId] = [];
    }

    TaskUserDataCodex[taskId].push(codexData[key]);

    if (UserTaskDataCodex[userId] === undefined) {
        UserTaskDataCodex[userId] = [];
    }

    UserTaskDataCodex[userId].push(codexData[key]);
}

export const TaskUserDataBaseline: any = {};
export const UserTaskDataBaseline: any = {};

for (const key of Object.keys(baselineData)) {
    const [taskId, userId] = key.split("_");

    if (TaskUserDataBaseline[taskId] === undefined) {
        TaskUserDataBaseline[taskId] = [];
    }

    TaskUserDataBaseline[taskId].push(baselineData[key]);

    if (UserTaskDataBaseline[userId] === undefined) {
        UserTaskDataBaseline[userId] = [];
    }

    UserTaskDataBaseline[userId].push(baselineData[key]);
}
