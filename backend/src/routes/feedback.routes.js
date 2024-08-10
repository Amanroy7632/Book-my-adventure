import { Router } from "express";
import { getAllFeedBack, registerFeedback } from "../controllers/feedback.controller.js";
import verifyToken from "../middlewares/user.middleware.js";
const router = Router()
router.route("/register").post(verifyToken,registerFeedback)
router.route("/").get(getAllFeedBack)
export default router