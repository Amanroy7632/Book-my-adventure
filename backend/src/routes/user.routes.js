import {Router} from "express"
import { forgetPasswordOtpGeneration, getUserProfile, loginUser, registerUser, resetPassword } from "../controllers/user.controller.js"
import verifyToken from "../middlewares/user.middleware.js"
const router = Router()
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/profile").get(verifyToken,getUserProfile)
router.route("/otp").post(forgetPasswordOtpGeneration)
router.route("/reset-password").post(resetPassword)
export default router