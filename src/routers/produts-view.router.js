import { Router } from "express";
import { ProductManager } from "../dao/managers/ProductManager.js";
import productModel from "../dao/models/products.model.js";

const productsViewsRouter = Router();
const productmanager = new ProductManager("./data/database.json");

productsViewsRouter.get("/", async (req, res) => {
	const products = await productModel.find().lean().exec();

	res.render("home", { products });
	console.log(products);
});

productsViewsRouter.get("/realtimeproducts", async (req, res) => {
	try {
		const products = await productModel.find().lean().exec();
		const processedProducts = products.map((product) => ({
			...product,
			shortId: product._id.toString().slice(-4),
		}));
		res.render("realTimeProducts", { processedProducts });
	} catch (error) {
		// Handle any potential errors here
		console.error("Error:", error);
		res.status(500).send("Internal Server Error");
	}
});

export default productsViewsRouter;
