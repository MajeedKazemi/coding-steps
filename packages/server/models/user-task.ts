import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IUserTask extends mongoose.Document {
    sequence: number;
    userId: string;
    taskId: string;
    userTaskId: string;
    startedAt: Date;
    finishedAt: Date;
    log: any;
    data: any;
    completed: boolean;
    submissions: Array<{
        code: string;
        submittedAt: Date;
        checkedAt?: Date;
        feedback?: string;
    }>;
    beingGraded: boolean;
    passed: boolean;
    savedCode: string;
    lastSaveAt: Date;
    finalGrades: Array<{
        grader: string;
        grade: number;
        receivedDirectHint: boolean;
    }>;
}

// a user-task represents a user's progress on a task
// it will be created when a user starts a task -> starts ticking the time
// it will be updated by submitting -> pauses the time -> sends for admins to check
// it will be updated by admins -> marks the task as completed or failed -> the client will poll the result
// if completed, the user will be able to go to the next task
// if failed, the user will be able to continue working on the task -> resuming the timer
const UserTaskSchema = new Schema({
    sequence: {
        type: Number,
        required: true,
    },
    userTaskId: {
        // userId_taskId
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: String,
        required: true,
    },
    taskId: {
        type: String,
        required: true,
    },
    startedAt: {
        type: Date,
        required: false,
    },
    finishedAt: {
        type: Date,
        required: false,
    },
    submissions: {
        type: Array,
        default: [],
    },
    log: {
        type: JSON,
        default: {},
    },
    data: {
        type: JSON,
        default: {},
    },
    completed: {
        type: Boolean,
        default: false,
    },
    beingGraded: {
        // and waiting to be checked
        type: Boolean,
        default: false,
    },
    passed: {
        // for modify code tasks -> we need to check if they have passed the "create code" task -> if yes, they can continue modifying their own version
        // if not -> we should provide the correct version
        type: Boolean,
        default: false,
    },
    savedCode: {
        type: String,
        default: "",
    },
    lastSaveAt: {
        type: Date,
        required: false,
    },
    finalGrades: {
        type: Array,
        default: [],
    },
});

export const UserTaskModel = mongoose.model<IUserTask>(
    "UserTask",
    UserTaskSchema
);
