import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const Schema = mongoose.Schema;

const Session = new Schema({
    refreshToken: {
        type: String,
        default: "",
    },
});

export interface IUser extends mongoose.Document {
    username: string;
    firstName: string;
    lastName: string;
    refreshToken: Array<{ refreshToken: string }>;
}

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        default: "",
    },
    lastName: {
        type: String,
        default: "",
    },
    age: {
        type: Number,
        default: 0,
    },
    grade: {
        type: Number,
        default: 0,
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
    },
    ethnicity: {
        type: String,
        default: "",
    },
    codingExperience: {
        type: [String],
        default: [],
    },
    refreshToken: {
        type: [Session],
    },
});

UserSchema.set("toJSON", {
    transform: (doc, ret, options) => {
        // Remove refreshToken from the response
        delete ret.refreshToken;

        return ret;
    },
});

UserSchema.plugin(passportLocalMongoose);

export const User = mongoose.model<IUser>("User", UserSchema);
