import config from "../config/config.js";

export default class PersistenceFactory {
	static getPersistance = async () => {
		switch (config.app.persistence) {
			case "MONGO":
				let { default: UsersDaoMongo } = await import("./usersDaoMongo.js");
				return new UsersDaoMongo();

			case "ARRAY":
				let { default: UsersDaoArray } = await import("./usersDaoArray.js");
				return new UsersDaoArray();

			case "FILE":
				let { default: UsersDaoFile } = await import("./usersDaoFile.js");
				return new UsersDaoFile();
			default:
				throw new Error("Persistance not found");
		}
	};
}
