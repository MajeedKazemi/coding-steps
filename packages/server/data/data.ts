import { data } from "./aggregated-data";

export const TaskUserData: any = {};
export const UserTaskData: any = {};

for (const key of Object.keys(data)) {
    const [taskId, userId] = key.split("_");

    if (TaskUserData[taskId] === undefined) {
        TaskUserData[taskId] = [];
    }

    TaskUserData[taskId].push(data[key]);

    if (UserTaskData[userId] === undefined) {
        UserTaskData[userId] = [];
    }

    UserTaskData[userId].push(data[key]);
}
