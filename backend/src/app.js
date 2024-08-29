import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { errorHandler } from "./utils/index.js"
import { busRouter, userRouter, routeRouter, questionAnswerRouter, feedbackRouter, ticketRouter, contactRouter, adminRouter } from "./routes/index.js"
const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())
app.get("/", (req, res) => {
    res.send("Home page for bus")
})
app.use("/api/v1/users", userRouter)
app.use("/api/v1/bus", busRouter)
app.use("/api/v1/routes", routeRouter)
app.use("/api/v1/question-answer", questionAnswerRouter)
app.use("/api/v1/feedback", feedbackRouter)
app.use("/api/v1/ticket", ticketRouter)
app.use("/api/v1/cabs", contactRouter) //create a router for contact form 
app.use("/api/v1/admin",adminRouter)
app.use(errorHandler)

export { app }