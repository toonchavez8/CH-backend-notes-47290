import config from "../Config/config";
import MongoDao from "../Models/MongoDao";
import UserService from "./usersService.js";

let dao;

switch (config.app.persistance) {
	case "MONGO":
		dao = new MongoDao(config.mongo);
		break;

	default:
		break;
}

export const userService = new UserService(dao);
