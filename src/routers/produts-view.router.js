import { Router } from "express";
import { ProductManager } from "../dao/managers/ProductManager.js";
import productModel from "../dao/models/products.model.js";
import { getProducts } from "./product.router.js";
import { PORT } from "../app.js";

const productsViewsRouter = Router();
const productmanager = new ProductManager("./data/database.json");

productsViewsRouter.get("/", async (req, res) => {
	try {
		const filterOptions = {}; // Initialize an empty filter object

		// Check if the 'category' query parameter exists and add it to filterOptions if provided
		if (req.query.category) {
			filterOptions.category = req.query.category;
		}

		const products = await getProducts(req, res, filterOptions); // Pass the filterOptions to getProducts

		if (products.statusCode === 200) {
			const totalPages = [];
			let link;
			const currentPage = parseInt(req.query.page || 1); // Get the current page from the query or default to 1

			for (let index = 1; index <= products.response.totalPages; index++) {
				const isCurrent = index === currentPage; // Check if this page is the current page

				if (!req.query.page) {
					link = `http://${req.hostname}:${PORT}${req.originalUrl}?page=${index}`;
				} else {
					const modifiedUrl = req.originalUrl.replace(
						`page=${req.query.page}`,
						`page=${index}`
					);
					link = `http://${req.hostname}:${PORT}${modifiedUrl}`;
				}
				totalPages.push({ page: index, link, isCurrent });
			}

			// Fetch the list of unique categories from the products
			const categories = await productModel.distinct("category").exec();

			const paginateInfo = {
				hasPrevPage: products.response.hasPrevPage,
				hasNextPage: products.response.hasNextPage,
				prevLink: products.response.prevLink,
				nextLink: products.response.nextLink,
				totalPages,
			};
			res.render("home", {
				products: products.response.payload,
				paginateInfo,
				categories,
			});
		}
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
