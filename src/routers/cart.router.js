import { Router } from "express";
import { CartManager } from "../managers/cartManager.js";
import chalk from "chalk";

const cartRouter = Router();
const productDBFilePath = "./data/database.json";
const cartDBFilePath = "./data/cartdb.json";

const cartManager = new CartManager(productDBFilePath, cartDBFilePath);

cartRouter.post("/", async (req, res) => {
	try {
		// Extract data from the request body
		const { products } = req.body;

		// Create a new cart object with a unique ID
		const newCart = {
			products: products || [], // Initialize products as an empty array or use the provided products if available
		};

		// Add the new cart to the cart database
		const addedCart = await cartManager.addToCart(newCart);

		// Respond with the newly created cart
		res.status(201).json(addedCart);
	} catch (error) {
		console.error(chalk.red("Error creating cart:", error.message));
		res.status(500).json({ error: error.message });
	}
});

export default cartRouter;
