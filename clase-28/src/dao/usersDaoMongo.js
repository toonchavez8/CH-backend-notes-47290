import mongoose from "mongoose";
import userModel from "../models/user.js";

export default class UserDaoMongo {
	constructor() {
		this.model = mongoose.model(userModel.collectionName, userModel.userSchema);
	}

	getAllUsers = async () => {
		let results = await this.model.find({});
		return results;
	};

	save = async (user) => {
		let result = await this.model.create(user);
		return result;
	};
}
