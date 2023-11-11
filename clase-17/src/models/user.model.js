import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const UserSchema = new mongoose.Schema({
	first_name: String,
	last_name: String,
	email: String,
	gender: String,
});

UserSchema.plugin(mongoosePaginate);

const userModel = mongoose.model("User", UserSchema);

export default userModel;
