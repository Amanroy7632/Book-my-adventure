import { Router } from "express";
import { registerBus,getBus, getBusId, getAllBus } from "../controllers/bus.controller.js";
const router = Router()
router.route("/register").post(registerBus)
router.route("/:id").get(getBus)
router.route("/").get(getBusId)
router.route("/admin/bus").get(getAllBus)
export default router