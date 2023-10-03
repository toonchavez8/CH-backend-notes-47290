import { Router } from "express";
import chalk from "chalk";
import { CartManager } from "../dao/managers/cartManager.js";
import cartModel from "../dao/models/carts.model.js";
import productModel from "../dao/models/products.model.js";

const cartRouter = Router();
const cartDBFilePath = "./data/cartdb.json";

const cartManager = new CartManager(cartDBFilePath);

const getProductsFromCart = async (cart) => {};

// temp to be delated
cartRouter.get("/", async (req, res) => {
	try {
		// Retrieve all carts from the database
		const allCarts = await cartModel.find().lean().exec();

		// Respond with the list of all carts
		res.status(200).json(allCarts);
	} catch (error) {
		console.error(chalk.red("Error retrieving carts:", error.message));
		res.status(500).json({ error: error.message });
	}
});

cartRouter.post("/", async (req, res) => {
	try {
		const { userEmail } = req.body;

		// Check if the userEmail is provided in the request body
		if (!userEmail) {
			return res
				.status(400)
				.json({ error: "User email is required to create a cart." });
		}

		// Create a new cart using the Cart model and the provided userEmail
		const newCart = new cartModel({
			userEmail,
			products: [], // Initialize with an empty array of products
		});

		// Save the new cart to the database
		const savedCart = await newCart.save();

		// Respond with the newly created cart
		res.status(201).json(savedCart);
	} catch (error) {
		console.error(chalk.red("Error creating cart:", error.message));

		// Check if the error is a MongoDB duplicate key error for userEmail
		if (error.code === 11000) {
			return res.status(400).json({ error: "User email already exists." });
		}

		res.status(500).json({ error: error.message });
	}
});

cartRouter.get("/:cid", async (req, res) => {
	try {
		const id = req.params.cid;

		// Find the cart by its _id using the Cart model
		const cart = await cartModel.findById(id).exec();

		if (!cart) {
			// Handle the case where the cart is not found
			res.status(404).json({ error: `Cart with ID ${id} not found.` });
		} else {
			// Respond with the retrieved cart
			res.status(200).json({ status: "success", payload: cart });
		}
	} catch (error) {
		// Handle any other errors that occur during the request
		console.error("Error retrieving cart:", error.message);
		res.status(500).json({ error: error.message });
	}
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
	try {
		const cartId = req.params.cid;
		const productId = req.params.pid;

		// Find the cart by its _id using the Cart model
		const cart = await cartModel.findById(cartId).exec();

		if (!cart) {
			// Handle the case where the cart is not found
			return res
				.status(404)
				.json({ error: `Cart with ID ${cartId} not found.` });
		}

		const product = await productModel.findById(productId).exec();

		if (!product) {
			// Handle the case where the product is not found
			return res
				.status(404)
				.json({ error: `Product with ID ${productId} not found.` });
		}

		cart.products.push({
			productId: product._id,
			quantity: 1, // You can adjust the quantity as needed
		});

		// Save the updated cart
		const updatedCart = await cart.save();

		// Respond with the updated cart
		res.status(200).json(updatedCart);
	} catch (error) {
		// Here we handle any other errors that occur during the request
		console.error("Error adding product to cart:", error.message);
		res.status(500).json({ error: error.message });
	}
});

export { cartRouter, getProductsFromCart };
