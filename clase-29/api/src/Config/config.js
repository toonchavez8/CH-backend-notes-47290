import dotenv from "dotenv";
dotenv.config();

export default {
	mongo: {
		URL: process.env.MONGO_URL,
	},
	app: {
		persistance: process.env.C29_PERSISTENCE || "LOCAL",
	},
	LOCAL: {
		URL: process.env.MONGO_LOCAL || "mongodb://localhost:27017/clase-29",
	},
};
