import config from "../config/config.js";

export let product;

switch (config.PERSISTANCE) {
	case "MONGO":
		console.log("Using MongoDB");
		break;
	case "FILE":
		console.log("Using File");
		break;
	default:
		break;
}
