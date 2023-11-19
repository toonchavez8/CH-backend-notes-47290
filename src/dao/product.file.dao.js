import { ProductManager } from "../fileManagers/ProductManager.js";

const productManager = new ProductManager("./data/database.json");

export default class ProductFileDao {
	getAll = async () => await productManager.getProducts();
	getByID = async (id) => await productManager.getProductbyId(id);
	getAllPaginate = async (req, PORT) => {
		const result = await productManager.getProducts();
		const limit = req.query.limit;
		if (typeof result == "string") {
			const error = result.split(" ");
			return {
				statusCode: parseInt(error[0].slice(1, 4)),
				response: { error: result.slice(6) },
			};
		}
		return {
			statusCode: 200,
			response: {
				payload: result.slice(0, limit),
			},
		};
	};
	create = async (data) => await productManager.addProduct(data);
	update = async (id, data) => await productManager.updateProductById(id, data);
	delete = async (id) => await productManager.deleteProductById(id);
}
