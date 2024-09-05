import { Feedback } from "../models/feedback.model.js"
import { ApiError, ApiResponse } from "../utils/index.js"

const registerFeedback = async (req, res, next) => {
    try {
        console.log("\x1b[33m%s\x1b[0m",`Api Hits for registering feedback & served by ${process.pid}`)
        const { userId, username, review, rating, route } = req.body

        if ([userId, username, review, route].some((field) => field.trim() === "")) {
            throw new ApiError(400, "All fields are required")
        }
        if (!userId) {
            throw new ApiError(401, "Unauthorized access")
        }
        if (!route) {
            throw new ApiError(400, "Route must be provided")
        }
        const feedback = await Feedback.create({ userId, username, review, rating, route })
        return res.status(201).send(new ApiResponse(201, feedback, "Feedback registered successfully"))
    } catch (error) {
        next(error)
    }
}
const getAllFeedBack = async (req, res, next) => {
    try {
        console.log("\x1b[33m%s\x1b[0m",`Api Hits for retrival of feedbacks & served by ${process.pid}`)
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const skip = (page - 1) * limit
        // console.log(page, limit);

        const totalFeedback = await Feedback.countDocuments()
        const feedbacks = await Feedback.find({}).skip(skip).limit(limit)
        return res.status(200).send(new ApiResponse(200, feedbacks, "Feedbacks fetched successfully"))
    } catch (error) {
        next(error)
    }
}
export { registerFeedback, getAllFeedBack }