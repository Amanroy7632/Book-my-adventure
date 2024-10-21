import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { ApiResponse, errorHandler } from "./utils/index.js"
import { busRouter, userRouter, routeRouter, questionAnswerRouter, feedbackRouter, ticketRouter, contactRouter, adminRouter, payemtRouter } from "./routes/index.js"
import { requestLimiter, authLimit } from "./utils/RequestLimit.js"
import RazorPay from "razorpay"
const app = express()
import { Server } from "socket.io"
import http from "http";


app.use(cors({
    // origin: process.env.CORS_ORIGIN || '*',
    origin: ["http://localhost:5173", "http://localhost:5173", "https://book-my-adventure.vercel.app", '*'],
    credentials: true
}))
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Allow frontend to connect
        methods: ["GET", "POST"]
    }
});
// app.use(requestLimiter)
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())
app.get("/", (req, res) => {
    console.log(process.pid);

    res.send(new ApiResponse(200, {
        company: "Book My Adventure",
        "author": "Aman Kumar Yadav",
        "license": "ISC",
        CEO: "Aman Kumar Yadav",
        developed: 'Sept ,2024',
        copyright: "All rights are reserved to Book My Adventure @amanroy7632",
        contact: {
            email: "yadavaman7632@gmail.com",
            github: "@amanroy7632",
            linkedin: "www.linkedin.com/in/aman-kumar-yadav-0a1b35243",
            leetcode: "https://leetcode.com/u/AmanRoy7632/"
        }
    }, "Success"))
})
app.get("/heavy", (req, res) => {
    console.log("Heavy hitted" + process.pid);

    let str = ''
    for (let i = 0; i < 1e6; i++) {
        str += i

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
app.use("/api/v1/payment", payemtRouter)
app.use(errorHandler)
export const instance = new RazorPay({
    key_secret: process.env.RAZORPAY_SECRET_KEY,
    key_id: process.env.RAZORPAY_KEY_ID
})
export { app, server, io }