import winston from "winston";
import dotenv from "dotenv";
import moment from "moment-timezone";

dotenv.config();

const commonLoggerOptions = {
	levels: {
		debug: 0,
		http: 1,
		info: 2,
		warning: 3,
		error: 4,
		fatal: 5,
	},
	format: winston.format.combine(
		winston.format.timestamp({
			format: () =>
				moment().tz("America/Mexico_City").format("hh:mma MM-DD/YYYY Z"),
		}),

		winston.format.json()
	),
};

winston.addColors({
	debug: "white",
	http: "green",
	info: "blue",
	warning: "yellow",
	error: "red",
	fatal: "magenta",
});

const createLogger = () => {
	const isProduction = process.env.NODE_ENV === "production";

	if (isProduction) {
		return winston.createLogger({
			...commonLoggerOptions,
			transports: [
				new winston.transports.File({
					level: "fatal",
					filename: "logs/error.log",
				}),
			],
		});
	} else {
		return winston.createLogger({
			...commonLoggerOptions,
			transports: [
				new winston.transports.Console({
					level: "fatal",
					format: winston.format.combine(
						winston.format.colorize({ all: true }),
						winston.format.simple()
					),
				}),
			],
		});
	}
};

const logger = createLogger();
export default logger;
