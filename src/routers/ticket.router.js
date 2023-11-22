import { Router } from "express";
import {
	getTickets,
	getTicketById,
	addTicket,
	updateTicket,
	deleteTicket,
} from "../controllers/ticketController.js";
import { passportCall } from "../utils.js";

// Declare variables
const ticketRouter = Router();

// Router path to get all tickets
ticketRouter.get("/", getTickets);

// Router path to get ticket by id
ticketRouter.get("/:tid", getTicketById);

// Create a new POST route for adding tickets
ticketRouter.post("/", addTicket);

// Router path to update ticket by id
ticketRouter.put("/:tid", updateTicket);

// Router path to delete ticket by id
ticketRouter.delete("/:tid", deleteTicket);

export { ticketRouter };
