import { Router } from "express";
import { registerContactForm } from "../controllers/contact.controller.js";

const router = Router()
router.route("/contact").post(registerContactForm)
export default router