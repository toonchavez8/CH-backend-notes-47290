import mongoose from "mongoose";
import userModel from "./models/user.model.js";

await mongoose.connect("mongodb://localhost:27017", {
	dbName: "clase-17",
});

console.log("Connected to MongoDB");

const users = await userModel.find();

console.log(users);
