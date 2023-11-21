import { CartManager } from "../fileManagers/cartManager.js";

const cartManager = new CartManager("./data/cartdb.json");

export default class CartFileDao {
	getAll = async () => {
		return await cartManager.getCarts();
	};
	getById = async (id) => {
		return await cartManager.getCartById(id);
	};
}
