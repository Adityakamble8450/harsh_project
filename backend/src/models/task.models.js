import mongoose, { Mongoose, Schema } from "mongoose";

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        default: "",
        enum: ["TO DO", "In Progress","Under Review","Finished"]
    },
    priority: {
        type: String,
        default: "Medium",
        enum: ["Medium","Low","Urgent"]
    },
    deadline: {
        type: String,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User", 
        required: true,
        
    }
},{
    timestamps: true,
})

export const TaskModel = mongoose.model("Task", taskSchema)