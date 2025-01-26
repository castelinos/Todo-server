import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    title:{
        type: String,
        required:true,
    },
    description:{
        type: String,
        required: true,
    },
    completed:{
        type: Boolean,
        default: false,
    }
});

export const Todo = mongoose.model('Todo',todoSchema);