import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
// import path from 'path';
const app = express();
// import { fileURLToPath } from 'url';


app.use(cors({origin: process.env.CORS_ORIGIN, Credential: true}))
app.use(express.json())
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser())

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// app.use(express.static(path.join(__dirname,'../frontend/dist')))
// app.get("*", (req,res)=>{
//     res.sendFile(path.join(__dirname,'../frontend/dist/index.html'))
// })



import authRoutes from "./routes/auth.routes.js"

app.use('/api/v1/users', authRoutes)

export default app;