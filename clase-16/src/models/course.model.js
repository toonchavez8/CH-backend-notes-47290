import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
	title: String,
	description: String,
	difficulty: Number,
	proffesor: String,
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
