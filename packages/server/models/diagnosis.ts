import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IDiagnosisEvent extends mongoose.Document {
    date: Date;
    message: string;
    type: "error" | "warning" | "info";
}

const DiagnosisSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["error", "warning", "info"],
        required: true,
    },
});

export const DiagnosisModel = mongoose.model<IDiagnosisEvent>(
    "DiagnosisEvent",
    DiagnosisSchema
);
