import { Router } from "express";
import {getRoute, registerRoute, updateRoute,} from "../controllers/route.controller.js"
const router = Router()
router.route("/register").post(registerRoute)
router.route("/update/:routeId").patch(updateRoute)
router.route("/").get(getRoute)
export default router