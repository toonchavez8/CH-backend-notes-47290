import { Router } from "express";
import chalk from "chalk";
import { CartManager } from "../dao/managers/cartManager.js";
import cartModel from "../dao/models/carts.model.js";
import productModel from "../dao/models/products.model.js";

const cartRouter = Router();
const cartDBFilePath = "./data/cartdb.json";

const cartManager = new CartManager(cartDBFilePath);

const getProductsFromCart = async (req, res) => {
	try {
		const id = req.params.cid;
		const result = await cartModel
			.findById(id)
			.populate("products.productId")
			.lean();

		console.log("result:", result);
		if (result === null) {
			return {
				statusCode: 404,
				response: {
					status: "error",
					error: "Cart not found.",
					message: "Cart not found.",
				},
			};
		}

		return {
			statusCode: 200,
			response: {
				status: "success",
				payload: result,
			},
		};
	} catch (error) {
		return {
			statusCode: 500,
			response: {
				status: "error",
				message: "Error retrieving products from cart.",
				error: error.message,
			},
		};
	}
};

// get all carts to be deleted later
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

// get all products in a cart
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

// update a product in a cart
cartRouter.put("/:cid/product/:pid", async (req, res) => {
	try {
		const cartId = req.params.cid;
		const productId = req.params.pid;
		const newQuantity = req.body.quantity;

		// Find the cart by its _id using the Cart model
		const cartToUpdate = await cartModel.findById(cartId).exec();

		if (!cartToUpdate) {
			// Handle the case where the cart is not found
			return res
				.status(404)
				.json({ error: `Cart with ID ${cartId} not found.` });
		}

		// Check if the product exists in the cart
		const productIndex = cartToUpdate.products.findIndex(
			(productItem) => productItem.productId.toString() === productId
		);

		if (productIndex === -1) {
			// Handle the case where the product is not found in the cart
			return res
				.status(404)
				.json({ error: `Product with ID ${productId} not found in cart.` });
		}

		if (newQuantity === 0) {
			// If the user sets the quantity to 0, remove the product from the cart
			cartToUpdate.products.splice(productIndex, 1);
		} else {
			// Set the quantity to the new value
			cartToUpdate.products[productIndex].quantity = newQuantity;
		}

		// Save the updated cart
		const updatedCart = await cartToUpdate.save();

		// Respond with the updated cart
		res.status(200).json(updatedCart);
	} catch (error) {
		// Handle any other errors that occur during the request
		console.error("Error updating product quantity in cart:", error.message);
		res.status(500).json({ error: error.message });
	}
});

// get a cart by id
cartRouter.get("/:cid", async (req, res) => {
	try {
		const result = await getProductsFromCart(req, res);
		res.status(200).json({ status: "Success", payload: result });
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
		const quantity = req.body.quantity || 1; // Get quantity from request body or default to 1

		// Find the cart by its _id using the Cart model
		const cartToUpdate = await cartModel.findById(cartId).exec();

		if (!cartToUpdate) {
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

		// Check if the product already exists in the cart
		const existingProduct = cartToUpdate.products.find(
			(productItem) => productItem.productId.toString() === productId
		);

		if (existingProduct) {
			// If the product exists, update its quantity
			existingProduct.quantity += quantity;
		} else {
			// If the product doesn't exist, add it to the cart
			cartToUpdate.products.push({
				productId: product._id,
				quantity,
			});
		}

		// Save the updated cart
		const updatedCart = await cartToUpdate.save();

		// Respond with the updated cart
		res.status(200).json(updatedCart);
	} catch (error) {
		// Here we handle any other errors that occur during the request
		console.error("Error adding product to cart:", error.message);
		res.status(500).json({ error: error.message });
	}
});

cartRouter.delete("/:cid/product/:pid", async (req, res) => {
	try {
		const cartId = req.params.cid;
		const productId = req.params.pid;
		const cartToUpdate = await cartModel.findById(cartId);

		if (!cartToUpdate) {
			// Handle the case where the cart is not found
			return res
				.status(404)
				.json({ error: `Cart with ID ${cartId} not found.` });
		}

		const productToDelete = await productModel.findById(productId);

		if (!productToDelete) {
			// Handle the case where the product is not found
			return res
				.status(404)
				.json({ error: `Product with ID ${productId} not found.` });
		}

		// Check if the product with the specified productId is in the cart
		const productIndex = cartToUpdate.products.findIndex(
			(product) => product.productId.toString() === productId
		);

		if (productIndex === -1) {
			// Handle the case where the product is not found in the cart
			return res.status(404).json({
				error: `Product with ID ${productId} not found in cart. perhaps it was already deleted?`,
			});
		} else {
			// Use $pull to remove the product with a specific productId from the products array
			cartToUpdate.products.pull({ productId: productToDelete._id });

			// Save the updated cart
			const updatedCart = await cartToUpdate.save();

			res.status(200).json(updatedCart);
		}
	} catch (error) {
		// Here we handle any other errors that occur during the request
		console.error("Error deleting product from cart:", error.message);
		res.status(500).json({ error: error.message });
	}
});

cartRouter.delete("/:cid", async (req, res) => {
	try {
		const cartId = req.params.cid;
		const cartToUpdate = await cartModel.findById(cartId);

		if (!cartToUpdate) {
			return res.status(404).json({
				error: `cart with id ${cartId} not found!`,
			});
		}

		cartToUpdate.products = [];

		const updatedCart = await cartToUpdate.save();
		res.status(200).json({ status: "Success", payload: updatedCart });
	} catch (error) {
		console.error(`Error deleting al products from cart ${error.message}`);
		res.status(500).json({ error: error.message });
	}
});

export { cartRouter, getProductsFromCart };
