import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
	first_name: String,
	last_name: String,
	email: String,
	courses: {
		type: [
			{
				course: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Course",
				},
				_id: false,
			},
		],
	},
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
