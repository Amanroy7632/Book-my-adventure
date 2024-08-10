import { Router } from "express";
import { registerBus,getBus } from "../controllers/bus.controller.js";
const router = Router()
router.route("/register").post(registerBus)
router.route("/:id").get(getBus)
export default router