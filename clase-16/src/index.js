import mongoose from "mongoose";
import studentModel from "./models/student.model.js";
import courseModel from "./models/course.model.js";

const uri = "mongodb://localhost:27017";

try {
	await mongoose.connect(uri, {
		dbName: "clase-16",
	});
	console.log("Connected to MongoDB");

	const Courseresponse = await courseModel.create({
		title: "Curso de Node.js",
		description: "Curso de Node.js en Platzi",
		difficulty: 1,
		proffesor: "Doc OC",
	});

	const response = await studentModel.create({
		first_name: "Juan",
		last_name: "Perez",
		email: "jperez@gmail.com",
		courses: [
			{
				course: Courseresponse._id,
			},
		],
	});
	console.log(Courseresponse);
	console.log(response);
} catch (error) {
	console.log("Error connecting to MongoDB");
}
