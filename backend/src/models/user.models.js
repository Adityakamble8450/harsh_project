import mongoose from "mongoose";
import { Schema } from "mongoose";

 const userSchema =  new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
 },{
    timestamps: true
 })

 export const UserModel  = mongoose.model("User", userSchema)
 