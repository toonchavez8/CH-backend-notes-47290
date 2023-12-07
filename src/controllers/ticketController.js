import { TicketService } from "../repositories/index.js";

import logger from "../config/logger.js";

export const getTickets = async (req, res) => {
	try {
		const tickets = await TicketService.getAll();
		// Return the entire result object
		res.status(200).json(tickets);
	} catch (error) {
		logger.error("Error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getTicketById = async (req, res) => {
	try {
		// Extract the ticket ID from the request parameters
		const purchaseCode = req.params.tid;

		// Find the ticket by ID using findById
		const ticket = await TicketService.getById(purchaseCode);

		if (!ticket) {
			return res.status(404).json({ error: "Ticket not found." });
		}

		res.status(200).json({ payload: ticket });
	} catch (error) {
		logger.error("Error fetching ticket:", error.message);
		res.status(500).json({ error: error.message });
	}
};

export const addTicket = async (req, res) => {
	try {
		// Extract ticket data from the request body
		const ticketData = req.body;

		// Save the new ticket to the database
		const addedTicket = await TicketService.create(ticketData);

		// Respond with a success message and the added ticket
		res.status(201).json({
			message: "Ticket added successfully.",
			payload: addedTicket,
		});
	} catch (error) {
		logger.error("Error adding ticket:", error.message);
		res.status(500).json({ error: error.message });
	} finally {
		if (res.statusCode == 201) {
			logger.error("Post completed successfully");
		} else {
			logger.http("Post failed");
		}
	}
};

export const updateTicket = async (req, res) => {
	try {
		// Extract the ticket ID from the request parameters
		const id = req.params.tid;

		// Create an object with the updated ticket data
		const updatedTicketData = req.body;

		// Call the updateTicketById method to update the ticket by ID
		const updatedTicket = await TicketService.update(id, updatedTicketData, {
			new: true,
		});

		// Check if the ticket was successfully updated
		if (!updatedTicket) {
			return res.status(404).json({ error: `Ticket with ID ${id} not found.` });
		}

		// Respond with a success message and the updated ticket
		res.status(200).json({
			message: "Ticket updated successfully.",
			ticket: updatedTicket,
		});
	} catch (error) {
		logger.error("Error updating ticket:", error.message);
		res.status(500).json({ error: error.message });
	}
};

export const deleteTicket = async (req, res) => {
	let deletedTicket; // Declare the variable here

	try {
		// Extract the ticket ID from the request parameters
		const id = req.params.tid;

		// Use TicketService.delete to delete the ticket by ID
		deletedTicket = await TicketService.delete(id);

		// Check if the ticket was successfully deleted
		if (!deletedTicket) {
			return res.status(404).json({ error: `Ticket with ID ${id} not found.` });
		}

		// Respond with a success message
		res.status(200).json({
			message: "Ticket deleted successfully.",
			ticketDeleted: deletedTicket,
		});
	} catch (error) {
		logger.error("Error deleting ticket:", error.message);
		res.status(500).json({ error: error.message });
	} finally {
		// Display the deleted ticket in the console
		if (deletedTicket) {
			logger.http(`Ticket with ID ${deletedTicket._id} deleted:`);
			logger.warning(deletedTicket);
		}
	}
};
