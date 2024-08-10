import {Router} from "express"
import { getUserProfile, loginUser, registerUser } from "../controllers/user.controller.js"
import verifyToken from "../middlewares/user.middleware.js"
const router = Router()
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/profile").get(verifyToken,getUserProfile)
export default router