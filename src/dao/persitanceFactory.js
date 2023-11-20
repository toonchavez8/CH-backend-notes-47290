import config from "../config/config.js";

export let ProductDAO;

switch (config.PERSISTANCE) {
	case "MONGO":
		const { default: ProductMongoDAO } = await import("./product.mongo.dao.js");
		ProductDAO = ProductMongoDAO;
		console.log("Using MongoDB");
		break;
	case "FILE":
		const { default: ProductFileDAO } = await import("./product.file.dao.js");
		ProductDAO = ProductFileDAO;
		console.log("Using File");
		break;

	default:
		console.error("Invalid PERSISTANCE value:", config.PERSISTANCE);
		throw new Error("Invalid PERSISTANCE value");
}
