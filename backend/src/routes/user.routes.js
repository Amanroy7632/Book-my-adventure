import { Router } from "express"
import { forgetPasswordOtpGeneration, getAllUsers, getUserProfile, loginUser, logoutUser, refreshUser, registerUser, removeAvatar, resetPassword, uploadAvatar } from "../controllers/user.controller.js"
import verifyToken from "../middlewares/user.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"
const router = Router()
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(verifyToken,logoutUser)
router.route("/refresh").post(refreshUser)
router.route("/profile").get(verifyToken, getUserProfile)
router.route("/otp").post(forgetPasswordOtpGeneration)
router.route("/reset-password").post(resetPassword)
router.route("/upload-avatar").patch(verifyToken, upload.single("avatar"), uploadAvatar)
router.route("/").delete(verifyToken, removeAvatar)
router.route("/get-all-users").get(getAllUsers)
export default router