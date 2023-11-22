import config from "../config/config.js";

export let ProductDAO;
export let CartDAO;
export let TicketDao;

switch (config.PERSISTANCE) {
	case "MONGO":
		const { default: ProductMongoDAO } = await import("./product.mongo.dao.js");
		const { default: CartMongoDAO } = await import("./cart.mongo.dao.js");
		const { default: TicketMongoDAO } = await import("./ticket.mongo.dao.js");
		ProductDAO = ProductMongoDAO;
		CartDAO = CartMongoDAO;
		TicketDao = TicketMongoDAO;
		console.log("Using MongoDB");
		break;
	case "FILE":
		const { default: ProductFileDAO } = await import("./product.file.dao.js");
		const { default: CartFileDao } = await import("./cart.file.dao.js");
		const { default: TicketFileDao } = await import("./ticket.file.dao.js");
		ProductDAO = ProductFileDAO;
		CartDAO = CartFileDao;
		TicketDao = TicketFileDao;
		console.log("Using File");
		break;

	default:
		console.error("Invalid PERSISTANCE value:", config.PERSISTANCE);
		throw new Error("Invalid PERSISTANCE value");
}
