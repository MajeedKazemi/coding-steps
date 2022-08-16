import env from "../utils/env";

export const authRefresh = () =>
    fetch(env.API_URL + "/api/auth/refreshToken", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
    });

export const authLogin = (username: string, password: string) =>
    fetch(env.API_URL + "/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

export const authLogout = (token: string | null | undefined) =>
    fetch(env.API_URL + "/api/auth/logout", {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

export const authSignup = (
    username: string,
    password: string,
    firstName: string,
    lastName: string
) =>
    fetch(env.API_URL + "/api/auth/signup", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            firstName,
            lastName,
            username,
            password,
        }),
    });

export const apiAdminGetSubmissions = (token: string | null | undefined) =>
    fetch(env.API_URL + "/api/admin/not-graded", {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

export const apiAdminFinalSubmissions = (
    token: string | null | undefined,
    taskId: string
) =>
    fetch(env.API_URL + "/api/admin/get-final-submissions/" + taskId, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

export const apiAdminSetGrade = (
    token: string | null | undefined,
    taskId: string,
    userId: string,
    passed: boolean,
    submittedAt: Date,
    index: number,
    feedback: string
) =>
    fetch(env.API_URL + "/api/admin/set-grade", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            taskId,
            userId,
            passed,
            submittedAt,
            checkedAt: new Date(),
            index,
            feedback,
        }),
    });

export const apiAdminSetFinalGrade = (
    token: string | null | undefined,
    taskId: string,
    userId: string,
    grade: number,
    receivedDirectHint: boolean
) =>
    fetch(env.API_URL + "/api/admin/set-final-grade", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            taskId,
            userId,
            grade,
            receivedDirectHint,
        }),
    });

export const apiUserNextTask = (token: string | null | undefined) =>
    fetch(env.API_URL + "/api/tasks/next", {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

export const apiUserSubmitTask = (
    token: string | null | undefined,
    taskId: string,
    data: any,
    finishedAt?: Date,
    startedAt?: Date
) =>
    fetch(env.API_URL + "/api/tasks/submit/", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            taskId,
            data,
            finishedAt: finishedAt,
            startedAt,
        }),
    });

export const apiUserStartTask = (
    token: string | null | undefined,
    taskId: string
) =>
    fetch(env.API_URL + "/api/tasks/start", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            taskId,
            // will be used if its the first time the user starts the task
            startedAt: new Date(),
        }),
    });

export const apiUserGradingStatus = (
    token: string | null | undefined,
    taskId: string
) =>
    fetch(env.API_URL + "/api/tasks/grading-status/" + taskId, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

export const apiUserEvaluateCode = (
    token: string | null | undefined,
    taskId: string,
    code: string
) =>
    fetch(env.API_URL + "/api/tasks/eval-code", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            taskId,
            submittedAt: new Date(),
            data: { code },
        }),
    });

export const apiSaveUserCode = (
    token: string | null | undefined,
    taskId: string,
    code: string
) =>
    fetch(env.API_URL + "/api/tasks/save-code", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            taskId,
            code,
        }),
    });

export const apiGetAllTaskIds = (token: string | null | undefined) =>
    fetch(env.API_URL + "/api/tasks/all-task-ids", {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

export const apiGetSavedUserCode = (
    token: string | null | undefined,
    taskId: string
) =>
    fetch(env.API_URL + "/api/tasks/get-saved-code/" + taskId, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

export const apiGenerateCodex = (
    token: string | null | undefined,
    description: string,
    context: string
) =>
    fetch(env.API_URL + "/api/codex/generate", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            description: description,
            type: "block",
            context: context,
        }),
    });

export const apiLogEvents = (
    token: string | null | undefined,
    taskId: string,
    log: any
) =>
    fetch(env.API_URL + "/api/tasks/log/", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            taskId,
            log,
        }),
    });

export const logError = (message: string) => {
    // fetch(env.API_URL + "/diagnostics/error", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         message,
    //         date: new Date(),
    //     }),
    // });
    console.error(message);
};
