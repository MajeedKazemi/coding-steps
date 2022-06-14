import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IUserTask extends mongoose.Document {
    userId: string;
    taskId: string;
    userTaskId: string;
    startedAt: Date;
    finishedAt: Date;
    data: any;
}

const UserTaskSchema = new Schema({
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
        required: true,
    },
    finishedAt: {
        type: Date,
        required: false,
    },
    data: {
        type: JSON,
        default: {},
    },
});

export const UserTask = mongoose.model<IUserTask>("UserTask", UserTaskSchema);
