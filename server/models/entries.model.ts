import { Schema, model } from "mongoose";
import { IEntry } from "../types";

const entrySchema = new Schema(
    {
        name: { type: String, required: [true, "Please enter user's name"] },
        email: { type: String, required: [true, "Please enter user's email ID"], unique: true },
        hobbies: { type: String, required: [true, "Please enter user's hobbies"] },
        phone: { type: String, required: [true, "Please enter user's phone number"] },
    },
    { timestamps: true }
);

export default model<IEntry>("Entry", entrySchema);
