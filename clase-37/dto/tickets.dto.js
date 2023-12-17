export default class TicketDTO {
	constructor(ticket) {
		this.id = this.id || this._id || null;
		this.name = ticket.name || "";
		this.description = ticket.description || "";
		this.userId = ticket.userId || "";
	}

	getTicket() {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			userId: this.userId,
		};
	}
}
