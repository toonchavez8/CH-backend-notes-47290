import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
	first_name: String,
	last_name: String,
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
