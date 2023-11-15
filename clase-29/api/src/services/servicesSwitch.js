import config from "../Config/config.js";
import MongoDao from "../Models/MongoDao.js";
import UserService from "./usersService.js";

let dao;

switch (config.app.persistance) {
	case "MONGO":
		dao = new MongoDao(config.mongo.URL);
		break;

	case "LOCAL":
		dao = new MongoDao(config.LOCAL.URL);
		break;

	default:
		break;
}

export const userService = new UserService(dao);
