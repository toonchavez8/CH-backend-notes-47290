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
		trim: true,
	},
	age: {
		type: Number,
	},
	password: {
		type: String,
		required: true,
	},
	cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts", required: true },

	role: {
		type: String,
		enum: ["user", "admin", "premium"],
		default: "user",
	},

	// Nueva propiedad para almacenar documentos
	documents: [
		{
			name: {
				type: String,
			},
			reference: {
				type: String,
			},
		},
	],

	// Nueva propiedad para almacenar la última conexión
	last_connection: {
		type: Date,
	},
});

const UserModel = mongoose.model(userCollection, userSchema);

export default UserModel;
