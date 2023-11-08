import mongoose from "mongoose";
import userModel from "./models/user.model.js";

const uri = "mongodb://localhost:27017";

try {
	await mongoose.connect(uri, {
		dbName: "clase-16",
	});
	console.log("Connected to MongoDB");

	const response = await userModel
		.find({ first_name: "Hyacinth" })
		.explain("executionStats");
	console.log(response);
} catch (error) {
	console.log("Error connecting to MongoDB");
}
