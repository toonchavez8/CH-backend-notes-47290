import cartModel from "../models/carts.model.js";

export default class CartMongoDao {
	getAllCarts = async () => await cartModel.find().lean().exec();
	createCart = async (data) => {
		return await cartModel.create(data);
	};
	getCartById = async (id) => {
		const result = await cartModel
			.findById(id)
			.populate("products.productId")
			.lean();
		return result;
	};

	updateCart = async (data) => {
		console.log("from update", data);
		return await cartModel.findByIdAndUpdate(data._id, data, { new: true });
	};

	clearCart = async () => await this.dao.clearCart();
	purchaseCart = async () => await this.dao.purchaseCart();
}
