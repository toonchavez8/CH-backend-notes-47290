import { Router } from "express";
import { ProductManager } from "../dao/managers/ProductManager.js";
import productModel from "../dao/models/products.model.js";
import { getProducts } from "./product.router.js";

const productsViewsRouter = Router();
const productmanager = new ProductManager("./data/database.json");

productsViewsRouter.get("/", async (req, res) => {
	try {
		const products = await getProducts(req, res);

		// Extract pagination information from the products result
		const { totalPages, prevLink, nextLink, page } = products.response;

		// Create an array of page objects for rendering
		const pages = [];
		for (let i = 1; i <= totalPages; i++) {
			pages.push({
				page: i,
				link: `/products/page/${i}`,
				isCurrent: i === page,
			});
		}

		// Include pagination information in the rendering context
		const paginateInfo = {
			hasPrevPage: page > 1,
			hasNextPage: page < totalPages,
			prevLink,
			nextLink,
			totalPages,
			pages,
		};

		res.render("home", { products: products.response.payload, paginateInfo });
	} catch (error) {
		// Handle any potential errors here
		console.error("Error:", error);
		res.status(500).send("Internal Server Error");
	}
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
