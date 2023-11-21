export default class CartRepository {
	constructor(dao) {
		this.dao = dao;
	}

	getAllCarts = async () => await this.dao.getAllCarts();
	createCart = async (data) => await this.dao.createCart(data);
	getCartById = async (id) => await this.dao.getCartById(id);

	updateCart = async (data) => await this.dao.updateCart(data);

	clearCart = async () => await this.dao.clearCart();
	purchaseCart = async () => await this.dao.purchaseCart();
}
