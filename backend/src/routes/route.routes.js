import { Router } from "express";
import {deleteRoute, getAllRoute, getRoute, registerRoute, updateRoute,} from "../controllers/route.controller.js"
const router = Router()
router.route("/register").post(registerRoute)
router.route("/update/:routeId").patch(updateRoute)
router.route("/").get(getRoute)
router.route("/get-all-routes").get(getAllRoute)
router.route("/:id").delete(deleteRoute);
export default router