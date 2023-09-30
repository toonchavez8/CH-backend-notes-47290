import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
	userEmail: {
		type: String,
		required: true,
		unique: true,
	},
	products: [
		{
			productId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "products",
			},
			quantity: {
				type: Number,
				default: 1,
			},
		},
	],
});

const cartModel = mongoose.model("carts", cartSchema);

export default cartModel;
