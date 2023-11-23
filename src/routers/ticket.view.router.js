import { Router } from "express";

import { CartService, TicketService } from "../repositories/index.js";
import { passportCall } from "../utils.js";

const tickerViewsRouter = Router();

tickerViewsRouter.get("/:ticketId", passportCall("jwt"), async (req, res) => {
	const ticket = await TicketService.getById(req.params.ticketId);
	if (ticket) {
		res.status(200).json(ticket);
	} else {
		res.status(404).json({ message: "Ticket not found" });
	}
});
