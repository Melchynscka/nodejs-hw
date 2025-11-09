import { Schema } from "mongoose";
import { model } from 'mongoose';
import { TAGS } from "../constants/tags.js";

const noteShema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            default: '',
            trim: true,
        },
        tag: {
            type: String,
            default: 'Todo',
            enum: TAGS,
            trim: true
        }, 
    },
    {
    timestamps: true,
    },
);

noteShema.index({ title: "text", content: "text" });

export const Note = model("Note", noteShema);