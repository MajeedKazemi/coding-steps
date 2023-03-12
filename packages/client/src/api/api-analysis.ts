import env from "../utils/env";

export const apiGetAggregatedDataFromTaskList = (
    taskList: Array<{
        userId: string;
        taskId: string;
    }>
) =>
    fetch(env.API_URL + "/api/analysis/agg-data-user-task-list/", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
            taskList,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

export const apiGetAggregatedDataPerTaskCodex = (taskId: string) =>
    fetch(env.API_URL + "/api/analysis/agg-data-per-task-codex/" + taskId, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });

export const apiGetAggregatedDataPerUserCodex = (userId: string) =>
    fetch(env.API_URL + "/api/analysis/agg-data-per-user-codex/" + userId, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });

export const apiGetAggregatedDataKeysCodex = () =>
    fetch(env.API_URL + "/api/analysis/agg-data-keys-codex/", {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });

export const apiGetAggregatedDataPerTaskBaseline = (taskId: string) =>
    fetch(env.API_URL + "/api/analysis/agg-data-per-task-baseline/" + taskId, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });

export const apiGetAggregatedDataPerUserBaseline = (userId: string) =>
    fetch(env.API_URL + "/api/analysis/agg-data-per-user-baseline/" + userId, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });

export const apiGetAggregatedDataKeysBaseline = () =>
    fetch(env.API_URL + "/api/analysis/agg-data-keys-baseline/", {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });
