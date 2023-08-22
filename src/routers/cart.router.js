import { Router } from "express";
import { CartManager } from "../managers/cartManager.js";
import chalk from "chalk";
import router from "./product.router.js";

const cartRouter = Router();
const cartDBFilePath = "./data/cartdb.json";

const cartManager = new CartManager(cartDBFilePath);

cartRouter.post("/", async (req, res) => {
	try {
		// Create a new cart
		const newCart = await cartManager.createCart();

		// Respond with the newly created cart
		res.status(201).json(newCart);
	} catch (error) {
		console.error(chalk.red("Error creating cart:", error.message));
		res.status(500).json({ error: error.message });
	}
});

cartRouter.get("/:cid", async (req, res) => {
	try {
		const id = parseInt(req.params.cid);

		// Call the getProductsFromCart method to retrieve products from the cart
		const result = await cartManager.getProductsFromCart(id);

		if (!result) {
			// Handle the case where the cart or products are not found
			console.log(result);
			res.status(404).json({ error: `Cart with ID ${id} not found.` });
		} else {
			// Respond with the retrieved products
			res.status(200).json({ status: "success", payload: result });
		}
	} catch (error) {
		// Handle any other errors that occur during the request
		console.error("Error retrieving products from cart:", error.message);
		res.status(500).json({ error: error.message });
	}
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
	try {
		const cid = parseInt(req.params.cid);
		const pid = parseInt(req.params.pid);

		// Call the addProductToCart method to add the product to the cart
		const updatedCart = await cartManager.addProductToCart(cid, pid);

		if (!updatedCart) {
			// Handle the case where the cart or product was not found
			res.status(404).json({ error: `Cart or product not found.` });
		} else {
			// Respond with the updated cart
			res.status(200).json(updatedCart);
		}
	} catch (error) {
		// Handle any other errors that occur during the request
		console.error("Error adding product to cart:", error.message);
		res.status(500).json({ error: error.message });
	}
});

export default cartRouter;
