import { Router } from "express";
import { ProductManager } from "../managers/ProductManager.js";
import chalk from "chalk";

// declared variables
const router = Router();
const databaseFilePath = "./data/database.json";

// create new class with db file path
const PM = new ProductManager(databaseFilePath);

// router path to get all products
router.get("/", async (req, res) => {
	const products = await PM.getProducts();
	const limit = parseInt(req.query.limit);

	console.log("limit", limit);
	if (products.length === 0) {
		return res
			.status(404)
			.json({ error: "No products found in the database." });
	}

	if (!isNaN(limit) && limit >= 0) {
		res.status(200).json({ payload: products.slice(0, limit) });
	} else {
		res.status(200).json({ payload: products });
	}
});

// router path to get product by id
router.get("/:pid", async (req, res) => {
	const id = parseInt(req.params.pid);
	const products = await PM.getProductbyId(id);

	if (!products || Object.keys(products).length === 0) {
		return res.status(404).json({ error: "Product not found." });
	}
	res.status(200).json({ payload: products });
});

// Create a new POST route for adding products
router.post("/", async (req, res) => {
	try {
		// Extract product data from the request body
		const { title, description, price, thumbnail, code, stock } = req.body;

		const addedProduct = await PM.addProduct(
			title,
			description,
			price,
			thumbnail,
			code,
			stock
		);

		// Respond with a success message and try to add product
		res
			.status(201)
			.json({ message: "Product added successfully.", payload: addedProduct });
	} catch (error) {
		console.log(chalk.red("Error adding product:", error.message));
		res.status(500).json({ error: error.message });
	} finally {
		if (res.statusCode == 201) {
			console.log(chalk.green("post completed succesfully"));
		} else {
			console.log(chalk.yellow("post failed"));
		}
	}
});

// route to update product by id
router.put("/:pid", (req, res) => {
	try {
		const id = parseInt(req.params.pid);
	} catch (error) {
	} finally {
	}
});

export default router;
