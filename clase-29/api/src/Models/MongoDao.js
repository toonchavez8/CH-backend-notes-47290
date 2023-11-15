import mongoose from "mongoose";
import User from "./UsersModel";

export default class MongoDao {
	constructor(config) {
		this.mongoose = mongoose.connect(config.mongo.URL).catch((err) => {
			console.log(err);
			process.exit();
		});

		const timestamp = {
			timestamps: {
				createdAt: "created_at",
				updatedAt: "updated_at",
			},
		};
		const userSchema = mongoose.Schema(User.schema, timestamp);

		this.models = {
			[User.model]: mongoose.model(User.model, userSchema),
		};
	}

	get = async (options, entity) => {
		if (!this.models[entity]) throw new Error(`Model ${entity} not found`);
		let results = await this.models[entity].find(options);
		return results;
	};

	insert = async (document, entity) => {
		if (!this.models[entity]) throw new Error(`Model ${entity} not found`);

		try {
			let instance = new this.models[entity](document);
			let results = await instance.save();
			return results;
		} catch (error) {
			console.log(error);
			return null;
		}
	};
}
