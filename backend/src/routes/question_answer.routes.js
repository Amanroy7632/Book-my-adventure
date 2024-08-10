import { Router } from "express";
import { getQuestion, registerAnswer, registerQuestion } from "../controllers/question_Answer.controller.js";
import verifyToken from "../middlewares/user.middleware.js";
const router = Router()
router.route("/register").post(verifyToken,registerQuestion)
router.route("/").get(getQuestion)
router.route("/register-answer/:questionId").post(registerAnswer)
export default router