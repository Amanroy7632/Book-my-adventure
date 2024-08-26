import { Router } from "express"
import { forgetPasswordOtpGeneration, getUserProfile, loginUser, registerUser, removeAvatar, resetPassword, uploadAvatar } from "../controllers/user.controller.js"
import verifyToken from "../middlewares/user.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"
const router = Router()
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/profile").get(verifyToken, getUserProfile)
router.route("/otp").post(forgetPasswordOtpGeneration)
router.route("/reset-password").post(resetPassword)
router.route("/upload-avatar").patch(verifyToken, upload.single("avatar"), uploadAvatar)
router.route("/").delete(verifyToken, removeAvatar)
export default router