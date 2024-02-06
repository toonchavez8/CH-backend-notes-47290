import config from "../config/config.js";

export let ProductDAO;
export let CartDAO;
export let TicketDAO;

switch (config.PERSISTANCE) {
	case "MONGO": {
		const { default: ProductMongoDAO } = await import("./product.mongo.dao.js");
		const { default: CartMongoDAO } = await import("./cart.mongo.dao.js");
		const { default: TicketMongoDAO } = await import("./ticket.mongo.dao.js");
		ProductDAO = ProductMongoDAO;
		CartDAO = CartMongoDAO;
		TicketDAO = TicketMongoDAO;
		console.log("Using MongoDB");
		break;
	}
	case "FILE": {
		const { default: ProductFileDAO } = await import("./product.file.dao.js");
		const { default: CartFileDAO } = await import("./cart.file.dao.js");
		const { default: TicketFileDAO } = await import("./ticket.file.dao.js");
		ProductDAO = ProductFileDAO;
		CartDAO = CartFileDAO;
		TicketDAO = TicketFileDAO;
		console.log("Using File");
		break;
	}
	default:
		console.error("Invalid PERSISTANCE value:", config.PERSISTANCE);
		throw new Error("Invalid PERSISTANCE value");
}
