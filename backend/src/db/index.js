import mongoose from 'mongoose'
// import { dbName } from '../constant.js'
import dotenv from "dotenv"

dotenv.config()
const connectdb = async ()=>{
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`mongodb connected successfully on host || ${connection.connection.host}`);
    } catch (error) {
        console.log("mongod db failed to connect", error);
    }
}

export default  connectdb;