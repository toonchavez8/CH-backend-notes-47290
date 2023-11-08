import mongoose from "mongoose";

export default mongoose.model(
	"users",
	mongoose.Schema({
		first_name: String,
		last_name: String,
		email: String,
		password: String,
	})
);
