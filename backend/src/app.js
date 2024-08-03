import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import {errorHandler} from "./utils/index.js"
import { userRouter } from "./routes/index.js"
const app =express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(cookieParser())
app.get("/",(req,res)=>{
    res.send("Home page for bus")
})
app.use("/api/v1/users",userRouter)
app.use(errorHandler)

export {app}