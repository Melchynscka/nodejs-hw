import { Schema } from "mongoose";
import { model } from 'mongoose';

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
            enum: ['Work', 'Personal', 'Meeting', 'Shopping', 'Ideas', 'Travel', 'Finance', 'Health', 'Important', 'Todo'],
            trim: true
        }, 
    },
    {
    timestamps: true,
    },
);

export const Note = model("Note", noteShema);