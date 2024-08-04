import connectdb from "./db/index.js";
import app from "./app.js"
import dotenv from 'dotenv'

dotenv.config({
    path: './env'
})

connectdb()
.then(
    ()=>{
        app.listen(process.env.PORT || 5000, ()=>{
            console.log(`SERVER IS LISTENING ON PORT ${process.env.PORT}`);
        })
    }
).catch(error => console.log("server failed to connect", error))