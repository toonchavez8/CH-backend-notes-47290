import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "products";

const productSchema = new mongoose.Schema({
	title: { type: String, required: true, unique: true },
	description: String,
	price: { type: Number, required: true },
	thumbnail: [String],
	code: { type: String, required: true, unique: true },
	stock: Number,
	category: [String],
	owner: { type: String, required: true, default: "admin", ref: "users" },
});

productSchema.plugin(mongoosePaginate);
const productModel = mongoose.model(productCollection, productSchema);

export default productModel;
