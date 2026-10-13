import { Schema } from "mongoose";

export const counterSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    value: {
        type: Number,
        required: true,
        default: 0
    }
})