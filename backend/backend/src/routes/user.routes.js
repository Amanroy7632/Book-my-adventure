import { Router } from "express"
import { activateUser, getCurrentUser, loginUser, registerUser } from "../controller/user.controller.js"
import verifyUserToken from "../middleware/auth.js"
const router = Router()
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/").get(verifyUserToken,getCurrentUser)
router.route("/activate/:accessToken").get(activateUser)
export default router