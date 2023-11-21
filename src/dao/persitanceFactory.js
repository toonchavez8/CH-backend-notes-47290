import config from "../config/config.js";

export let ProductDAO;
export let CartDAO;

switch (config.PERSISTANCE) {
	case "MONGO":
		const { default: ProductMongoDAO } = await import("./product.mongo.dao.js");
		const { default: CartMongoDAO } = await import("./cart.mongo.dao.js");
		ProductDAO = ProductMongoDAO;
		CartDAO = CartMongoDAO;
		console.log("Using MongoDB");
		break;
	case "FILE":
		const { default: ProductFileDAO } = await import("./product.file.dao.js");
		const { default: CartFileDao } = await import("./cart.file.dao.js");
		ProductDAO = ProductFileDAO;
		CartDAO = CartFileDao;
		console.log("Using File");
		break;

	default:
		console.error("Invalid PERSISTANCE value:", config.PERSISTANCE);
		throw new Error("Invalid PERSISTANCE value");
}
