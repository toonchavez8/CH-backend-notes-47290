import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true,
		validate: {
			validator: (value) => {
				// You can use a regex or a library like validator.js to validate email format
				// Example using regex:
				return /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/.test(
					value
				);
			},
			message: "Invalid email format",
		},
	},
	password: {
		type: String,
		required: true,
		select: false, // Hide the password field by default
	},
	role: {
		type: String,
		enum: ["user", "admin"],
		default: "user",
	},
});

const UserModel = mongoose.model(userCollection, userSchema);

export default UserModel;
