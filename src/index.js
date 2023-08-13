// All imports
import chalk from "chalk";
import express from "express";
import { ProductManager } from "./ProductManager.js";

// loading console log
console.log(chalk.yellow("starting ...   "));

const databaseFilePath = "./data/database.json";
const PM = new ProductManager(databaseFilePath);

const app = express();

app.get("/products", async (req, res) => {
	const products = await PM.getProducts();
	const limit = parseInt(req.query.limit);

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

app.get("/products/:id", async (req, res) => {
	const id = parseInt(req.params.id);
	const products = await PM.getProductbyId(id);

	if (!products || Object.keys(products).length === 0) {
		return res.status(404).json({ error: "Product not found." });
	}
	res.status(200).json({ payload: products });
});

app.listen(3000, () => {
	console.log(chalk.green("Server started on port 3000"));
});
