import { Router } from "express";
import { deleteTicket, getAllTickets, getTickets, registerManyTicket, registerTicket } from "../controllers/ticket.controller.js";
import verifyToken from "../middlewares/user.middleware.js";

const router = Router()
router.route("/register-single").post(verifyToken,registerTicket)
router.route("/register").post(verifyToken,registerManyTicket)
router.route("/").get(verifyToken,getTickets)
router.route("/:ticketId").patch(getTickets)
router.route("/:ticketId").delete(deleteTicket)
router.route("/tickets/all").get(getAllTickets)

export default router