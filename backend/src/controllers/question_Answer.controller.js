import { Answer } from "../models/answer.model.js"
import { Question } from "../models/question.model.js"
import { ApiError, ApiResponse } from "../utils/index.js"

const registerQuestion = async (req, res, next) => {
    try {
        console.log("Api Hit -> "+"/api/v1/question-answer/register")
        console.log("\x1b[33m%s\x1b[0m",`Api Hits for retrival of question-answer & served by ${process.pid}`)

        const { question, userId } = req.body
        console.log(question,userId);
        if (!question || !userId) {
            throw new ApiError(400,"All fields are required")
        }
        if ([question, userId].some(field => field.trim() === "")) {
            throw new ApiError(401, "All fields are required")
        }
        
        const ques = await Question.create({ question, owner: userId })
        if (!ques) {
            throw new ApiError(500, "Something went wrong while registering question,\nPlease Try again..")
        }
        return res.status(201).send(new ApiResponse(201, ques, "Question Registerd successfully registered"))
    } catch (error) {
        next(error)
    }
}
const updateQuestion = async (req, res, next) => {
    try {

    } catch (error) {

    }
}
const deleteQuestion = async (req, res, next) => {
    try {

    } catch (error) {

    }
}
const getQuestion = async (req, res, next) => {
    try {
        console.log("Api Hit -> "+"/api/v1/question-answer/")
        console.log("\x1b[33m%s\x1b[0m",`Api Hits for retrival of question-answer & served by ${process.pid}`)
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * limit
        const totalQuestion = await Question.countDocuments({})
        const totalPages = Math.ceil(totalQuestion /limit)
        const questionAnswer = await Question.aggregate([
            {
                $match: {

                }
            },
            {
                $skip: skip
            },
            
            {
                $limit: limit
            },
            {
                $lookup: {
                    from: "answers",
                    localField: "_id",
                    foreignField: "questionId",
                    as: "answers"
                }
            },
            {
                $addFields: {
                    answer: {
                        text: { $first: "$answers.answer" },
                    },
                }
            },
            {
                $project: {
                    _id: 1,
                    question: 1,
                    answer: 1,
                    page: 1
                }
            }
        ])
        // console.log(questionAnswer.length);
        return res.status(200).send(new ApiResponse(200, { questionAnswer, currentPage: page, limit ,totalPages}, "All question fetched"))
    } catch (error) {
        next(error)
    }
}
const registerAnswer = async (req, res, next) => {
    try {
        console.log("\x1b[33m%s\x1b[0m",`Api Hits for registering question & served by ${process.pid}`)
        const { questionId } = req.params
        console.log("Api Hit -> "+`/register-answer/${questionId}`)
        const { answer, userId } = req.body
        if (!questionId) {
            throw new ApiError(401, "Question Id is required")
        }
        if ([answer, userId].some(field => field.trim() === "")) {
            throw new ApiError(401, "All fields are required")
        }
        const ans = await Answer.create({ answer, owner: userId, questionId })
        if (!ans) {
            throw new ApiError(500, "Something went wrong while registering answer,\nPlease Try again..")
        }
        return res.status(201).send(new ApiResponse(201, ans, "Answer Registerd successfully registered"))
    } catch (error) {
        next(error)
    }
}
const updateAnswer = async (req, res, next) => {
    try {

    } catch (error) {

    }
}
const deleteAnswer = async (req, res, next) => {
    try {

    } catch (error) {

    }
}
const getAnswer = async (req, res, next) => {
    try {

    } catch (error) {

    }
}
export {
    registerQuestion,
    updateQuestion,
    deleteQuestion,
    getQuestion,
    registerAnswer,
    updateAnswer,
    deleteAnswer,
    getAnswer
}