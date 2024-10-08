import { Router } from "express";
import verifyToken from "../middlewares/user.middleware.js";
import { createOrder, getKey, paymentVerification } from "../controllers/payment.controller.js";

const router = Router();
router.route("/orders").post(verifyToken,createOrder);
router.route("/paymentverification").post(verifyToken,paymentVerification);
router.route("/key").get(verifyToken,getKey)

export default router;