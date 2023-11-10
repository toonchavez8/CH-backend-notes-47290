import mongoose from "mongoose";
import studentModel from "./models/student.model.js";
import courseModel from "./models/course.model.js";

const uri = "mongodb://localhost:27017";

try {
	await mongoose.connect(uri, {
		dbName: "clase-16",
	});
	console.log("Connected to MongoDB");

	const response = await studentModel
		.findOne({
			_id: "654d87772c86a40a6d1aaa49",
		})
		.populate("courses.course");
	console.log(JSON.stringify(response, null, 2));
} catch (error) {
	console.log("Error connecting to MongoDB");
}
