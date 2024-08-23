
import express from "express"
import cors from "cors"
const app = express()
import { userRouter } from "./routes/index.js"
import { errorHandler } from "./utils/ErrorHandler.js"
app.use(cors({
    origin:"*",
    credentials:true
}))
app.use(express.json({limit:"16kb"}))
app.get("/",(req,res)=>{
    return res.send("All Are working fine")
})
app.use("/api/v1/users",userRouter)
app.use(errorHandler)
export  {app}