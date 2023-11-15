import dotenv from "dotenv";
dotenv.config();

export default {
	mongo: {
		URL: process.env.MONGO_URL || "mongodb://localhost:27017/clase29",
	},
	app: {
		persistance: process.env.C29_PERSISTENCE || "MONGO",
	},
};
