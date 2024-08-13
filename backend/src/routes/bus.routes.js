import { Router } from "express";
import { registerBus,getBus, getBusId } from "../controllers/bus.controller.js";
const router = Router()
router.route("/register").post(registerBus)
router.route("/:id").get(getBus)
router.route("/").get(getBusId)
export default router