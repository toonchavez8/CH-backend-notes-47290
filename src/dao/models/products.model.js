import mongoose from "mongoose";

const productCollection = "products";

const productSchema = new mongoose.Schema({
	title: { type: String, required: true, unique: true },
	description: String,
	price: { type: Number, required: true },
	thumbnail: [String],
	code: { type: String, required: true, unique: true },
	stock: Number,
	category: [String],
});

const productModel = mongoose.model(productCollection, productSchema);

export default productModel;
