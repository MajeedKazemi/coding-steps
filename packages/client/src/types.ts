export interface IUser {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    role: string;
    age: number;
    grade: number;
    editorType: "copilot" | "intellisense";
    gender: "male" | "female" | "other";
    ethnicity: string;
    codingExperience: Array<string>;
}

export interface ISubmission {
    index: number;
    id: string;
    userId: string;
    taskId: string;
    taskTitle: string;
    taskType: string;
    code: string;
    submittedAt: number;
}

export interface IContext {
    token: string | null;
    user: IUser | null;
}
