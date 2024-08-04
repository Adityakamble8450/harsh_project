import { comparePassword, hashPassword } from "../helper/auth.helper.js";
import { UserModel } from "../models/user.models.js";
import jwt from "jsonwebtoken"

export const registerController = async (req,res)=>{
    try {
        const {name, email, password} = req.body;
        if(!name){
            return res.status(404).send("Name is required")
        }
        if(!email){
            return res.status(404).send("Name is required")
        }
        if(!password){
            return res.status(404).send("Name is required")
        }

        const existingUser  = await UserModel.findOne({email})
        if(existingUser){
            return res.status(403).send({
                success: false,
                message: "User Already Existed"
            })
        }
        const hasheedpassword = await hashPassword(password)
        const user =  await new UserModel({email,password: hasheedpassword,name}).save()
         return res.status(200).send({
            success: true,
            message: "User Register Successfully",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(401).send(
            {success: false,
            message: "Failed while registering",}
        )
    }
}
export const loginController = async (req,res)=>{
    try {
        const {email, password} = req.body;
        if(!email){
            return res.status(404).send("Email is required")
        }
        if(!password){
            return res.status(404).send("Email is required")
        }

        //first find the user on the basis of email
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success: false,
                message: "User is not registered"
            })
        }

        const match = await comparePassword(password, user.password)
        //check for the password
        if(!match){
            return res.status(404).send("Invalid Password")
        }

        //if the user found the create a token while login
        const token = await jwt.sign(
            {
                id: user._id,
            },
            process.env.jwt,
            {
                expiresIn: "30d"
            }
        );
        return res.status(201).send({
            success: true,
            message: "User Logged In Successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token
        })
    } catch (error) {
        console.log(error);
        res.status(404).send({
            success: false,
            message: "Error While Login",
            error
        })
    }
}
