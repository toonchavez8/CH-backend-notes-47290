import { Router } from "express";

import { TicketService } from "../repositories/index.js";
import { passportCall } from "../utils.js";

const ticketViewRouter = Router();

ticketViewRouter.get("/:ticketId", passportCall("jwt"), async (req, res) => {
	const ticketId = req.params.ticketId;
	const ticket = await TicketService.getById(ticketId);
	if (!ticket) {
		return res.render("error", { error: "Ticket not found" });
	}

	res.render("ticket", { ticket });
});

export default ticketViewRouter;
