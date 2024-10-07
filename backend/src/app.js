import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { ApiResponse, errorHandler } from "./utils/index.js"
import { busRouter, userRouter, routeRouter, questionAnswerRouter, feedbackRouter, ticketRouter, contactRouter, adminRouter } from "./routes/index.js"
import { requestLimiter, authLimit } from "./utils/RequestLimit.js"


const app = express()
app.use(cors({
    // origin: process.env.CORS_ORIGIN || '*',
    origin: ["http://localhost:5173","http://localhost:5173","https://book-my-adventure.vercel.app",'*'],
    credentials: true
}))
// app.use(requestLimiter)
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())
app.get("/", (req, res) => {
    console.log(process.pid);
    
    res.send(new ApiResponse(200, {
        company:"Book My Adventure",
        "author": "Aman Kumar Yadav",
        "license": "ISC",
        CEO:"Aman Kumar Yadav",
        developed:'Sept ,2024',
        copyright:"All rights are reserved to Book My Adventure @amanroy7632",
        contact:{
             email:"yadavaman7632@gmail.com",
             github:"@amanroy7632",
             linkedin:"www.linkedin.com/in/aman-kumar-yadav-0a1b35243",
             leetcode:"https://leetcode.com/u/AmanRoy7632/"
        }
    }, "Success"))
})
app.get("/heavy",(req,res)=>{
    console.log("Heavy hitted"+process.pid);
    
    let str=''
    for (let i = 0; i < 1e6; i++) {
        str+=i
        
    }
    res.send(str)
})
app.use("/api/v1/", requestLimiter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/bus", busRouter)
app.use("/api/v1/routes", routeRouter)
app.use("/api/v1/question-answer", questionAnswerRouter)
app.use("/api/v1/feedback", feedbackRouter)
app.use("/api/v1/ticket", ticketRouter)
app.use("/api/v1/cabs", contactRouter) //create a router for contact form 
app.use("/api/v1/admin", adminRouter)
app.use(errorHandler)

export { app }