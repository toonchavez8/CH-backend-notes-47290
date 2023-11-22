import fs from "fs";
import chalk from "chalk";

export class TicketManager {
	#_tickets;
	#databaseFilePath;

	constructor(databaseFilePath) {
		this.#_tickets = [];
		this.#databaseFilePath = databaseFilePath; // Store the database file path
		if (databaseFilePath) {
			this.loadDatabase(databaseFilePath);
		}
	}

	async loadDatabase(databaseFilePath) {
		try {
			const data = await fs.promises.readFile(databaseFilePath, "utf-8");
			this.#_tickets = JSON.parse(data);
		} catch (err) {
			if (err.code === "ENOENT") {
				console.error("Error: Database doesn't exist or is empty.");
			} else {
				console.error("Error reading from database:", err);
			}
			this.#_tickets = [];
		} finally {
			console.log(
				chalk.yellow(
					`Database Loaded with ${this.#_tickets.length} ${
						this.#_tickets.length > 1 ? "tickets" : "ticket"
					}`
				)
			);
		}
	}

	async saveDatabase(databaseFilePath = null) {
		if (!databaseFilePath) {
			databaseFilePath = this.#databaseFilePath; // Use the original database file path
		}

		try {
			await fs.promises.writeFile(
				databaseFilePath,
				JSON.stringify(this.#_tickets)
			);
		} catch (err) {
			console.error("Error writing to database:", err);
		} finally {
			console.log(chalk.green("Database saved successfully!"));
		}
	}

	async getTickets() {
		return this.#_tickets;
	}

	async addTicket(data) {
		const { title, description, price, date } = data;

		if (!title || !description || !price || !date) {
			throw new Error("Missing required fields for adding a ticket.");
		}

		const ticket = {
			id: this.#getNextId(),
			title,
			description,
			price,
			date,
		};

		this.#_tickets.push(ticket);
		await this.saveDatabase();
		console.log("Ticket added successfully and database updated.");
		return ticket;
	}

	async getTicketById(id) {
		const ticket = this.#_tickets.find((t) => t.id === id);
		if (!ticket) {
			console.error(`Ticket with id ${id} not found.`);
			return null;
		}
		return ticket;
	}

	async deleteTicketById(id) {
		const index = this.#_tickets.findIndex((ticket) => ticket.id === id);
		if (index === -1) {
			console.error(`Ticket with id ${id} not found.`);
			return null;
		}

		// Remove the ticket from the array and store it in a variable
		const deletedTicket = this.#_tickets.splice(index, 1)[0];

		await this.saveDatabase();
		console.log(`Ticket with id ${id} deleted successfully.`);

		// Return the deleted ticket
		return deletedTicket;
	}

	async updateTicketById(id, updatedTicket) {
		const index = this.#_tickets.findIndex((ticket) => ticket.id === id);
		if (index === -1) {
			console.error(`Ticket with id ${id} not found.`);
			throw new Error(`Ticket with id ${id} not found.`);
		}

		// Loop through the properties of the updatedTicket and update the corresponding properties of the existing ticket
		for (const prop in updatedTicket) {
			if (updatedTicket.hasOwnProperty(prop)) {
				this.#_tickets[index][prop] = updatedTicket[prop];
			}
		}

		await this.saveDatabase();
		console.log("Ticket updated successfully and database updated.");
		return this.#_tickets[index];
	}

	#getNextId() {
		if (this.#_tickets.length === 0) return 1;
		return this.#_tickets[this.#_tickets.length - 1].id + 1;
	}
}
