import dotenv from "dotenv";
import program from "./command.js";

const opts = program.opts();

dotenv.config();

export default {
	APISERVER: {
		PORT: process.env.PORT || 8080,
	},
	MONGO: {
		URI: process.env.MONGO_URI,
		DB: process.env.MONGO_DB,
	},
	ADMIN: {
		EMAIL: process.env.ADMIN_EMAIL,
		PASSWORD: process.env.ADMIN_PASSWORD,
	},
	GitHub: {
		CLIENT_ID: process.env.GITHUB_CLIENT_ID,
		CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
		CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
	},
	JWT: {
		SECRET: process.env.JWT_SECRET,
		EXPIRES_IN: process.env.JWT_EXPIRES_IN,
		COOKIE_NAME: process.env.JWT_COOKIE_NAME,
	},
	PERSISTANCE: opts.Persistence || process.env.PERSISTANCE,
};
