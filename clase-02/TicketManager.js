class TicketManger {
	#_events;
	constructor() {
		this.#_events = [];
	}

	get events() {
		return this.#_events;
	}

	set events(events) {
		events.id = this.#getNextId();
		this.#_events.push(events);
	}

	#getNextId() {
		if (this.#_events.length === 0) return 1;
		return this.#_events[this.#_events.length - 1].id + 1;
	}
}

const tm = new TicketManger();

tm.events = { artist: "bad bunny", city: "caba", price: 120, capacity: 1500 };
tm.events = { artist: "coldplay", city: "gdl jal", price: 200, capacity: 8000 };
tm.events = {
	artist: "metallica",
	city: "mexico",
	price: 150,
	capacity: 10000,
};

console.log("events", tm.events);
