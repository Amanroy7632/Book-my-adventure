import { Router } from "express";
import {getAllRoute, getRoute, registerRoute, updateRoute,} from "../controllers/route.controller.js"
const router = Router()
router.route("/register").post(registerRoute)
router.route("/update/:routeId").patch(updateRoute)
router.route("/").get(getRoute)
router.route("/get-all-routes").get(getAllRoute)
export default router