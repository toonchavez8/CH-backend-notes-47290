import { Router } from "express";
import { ProductManager } from "../managers/ProductManager.js";

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

router.get("/:id", async (req, res) => {
	const id = parseInt(req.params.id);
	const products = await PM.getProductbyId(id);

	if (!products || Object.keys(products).length === 0) {
		return res.status(404).json({ error: "Product not found." });
	}
	res.status(200).json({ payload: products });
});

export default router;
