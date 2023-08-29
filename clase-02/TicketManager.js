import chalk from "chalk";

class TicketManger {
	#_events;
	#_user;
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

	get user() {
		return this.#_user;
	}

	set user(newUser) {
		switch (true) {
			case !newUser.name && !newUser.age && !newUser.event:
				console.error(chalk.red("Name, Age, and Event are required"));
				break;
			case !newUser.name && !newUser.age:
				console.error(chalk.red("Name and Age are required"));
				break;
			case !newUser.name && !newUser.event:
				console.error(chalk.red("Name and Event are required"));
				break;
			case !newUser.age && !newUser.event:
				console.error(chalk.red("Age and Event are required"));
				break;
			case !newUser.name:
				console.error(chalk.red("Name is required"));
				break;
			case !newUser.age:
				console.error(chalk.red("Age is required"));
				break;
			case !newUser.event:
				console.error(chalk.red("Event is required"));
				break;
			default:
				// Check if the event exists and attach it to the user
				const validEvent = this.#_events.find(
					(event) => event.id === newUser.event
				);
				if (validEvent) {
					this.#_user = { ...newUser, event: validEvent };
				} else {
					throw new Error(`Event with id ${newUser.event} not found.`);
				}
		}
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
console.log(chalk.green("starting... ticketmanager"));

tm.user = { name: "John Doe", age: 30, event: 1 };

console.log(chalk.yellow(`name: "John Doe", age: 30, event: 5`));
console.log("user updated", tm.user);
