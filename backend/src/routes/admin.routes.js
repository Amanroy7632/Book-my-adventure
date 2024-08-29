import { Router } from "express";
import { getAllInformation } from "../controllers/admin.controller.js";

const router = Router()
router.route("/information").get(getAllInformation)
export default router