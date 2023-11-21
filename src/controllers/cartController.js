import chalk from "chalk";
import cartModel from "../models/carts.model.js";
import productModel from "../models/products.model.js";
import { CartService, ProductService } from "../repositories/index.js";

export const getProductsFromCartController = async (req, res) => {
	try {
		const id = req.params.cid;
		const result = await CartService.getCartById(id);
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

		return result;
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
export const getAllCartsController = async (req, res) => {
	try {
		// Retrieve all carts from the database
		const allCarts = await CartService.getAllCarts();

		// Respond with the list of all carts
		res.status(200).json(allCarts);
	} catch (error) {
		console.error(chalk.red("Error retrieving carts:", error.message));
		res.status(500).json({ error: error.message });
	}
};
export const createCartController = async (req, res) => {
	try {
		const { userEmail } = req.body;

		// Check if the userEmail is provided in the request body
		if (!userEmail) {
			return res
				.status(400)
				.json({ error: "User email is required to create a cart." });
		}

		// Create a new cart using the Cart model and the provided userEmail

		const data = { userEmail, products: [] };

		// Save the new cart to the database
		const savedCart = await CartService.createCart(data);

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
};
export const getCartByIDController = async (req, res) => {
	try {
		const result = await getProductsFromCartController(req, res);
		res.status(200).json({ status: "Success", payload: result });
	} catch (error) {
		// Handle any other errors that occur during the request
		console.error("Error retrieving cart:", error.message);
		res.status(500).json({ error: error.message });
	}
};
export const addProductToCartController = async (req, res) => {
	try {
		const cartId = req.params.cid;
		const productId = req.params.pid;
		const quantity = req.body.quantity || 1; // Get quantity from request body or default to 1

		// Find the cart by its _id using the Cart model
		const cartToUpdate = await CartService.getCartById(cartId);

		if (!cartToUpdate) {
			// Handle the case where the cart is not found
			return res
				.status(404)
				.json({ error: `Cart with ID ${cartId} not found.` });
		}

		const product = await ProductService.getById(productId);

		if (!product) {
			// Handle the case where the product is not found
			return res
				.status(404)
				.json({ error: `Product with ID ${productId} not found.` });
		}

		// Check if the product already exists in the cart
		const existingProduct = cartToUpdate.products.find(
			(productItem) =>
				productItem.productId._id.toString() === productId.toString()
		);

		if (existingProduct) {
			existingProduct.quantity += quantity;
		} else {
			// If the product doesn't exist, add it to the cart
			cartToUpdate.products.push({
				productId: product._id,
				quantity,
			});
		}

		// Save the updated cart
		const updatedCart = await CartService.updateCart(cartToUpdate);

		// Respond with the updated cart
		res.status(200).json(updatedCart);
	} catch (error) {
		// Here we handle any other errors that occur during the request
		console.error("Error adding product to cart:", error.message);
		res.status(500).json({ error: error.message });
	}
};
export const updateCartController = async (req, res) => {
	try {
		const cartId = req.params.cid;
		const productId = req.params.pid;
		const newQuantity = req.body.quantity;

		// Find the cart by its _id using the Cart model
		const cartToUpdate = await CartService.getCartById(cartId);

		if (!cartToUpdate) {
			// Handle the case where the cart is not found
			return res
				.status(404)
				.json({ error: `Cart with ID ${cartId} not found.` });
		}

		// Check if the product exists in the cart
		const productIndex = cartToUpdate.products.findIndex(
			(productItem) =>
				productItem.productId._id.toString() === productId.toString()
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
		const updatedCart = await CartService.updateCart(cartToUpdate);
		// Respond with the updated cart
		res.status(200).json(updatedCart);
	} catch (error) {
		// Handle any other errors that occur during the request
		console.error("Error updating product quantity in cart:", error.message);
		res.status(500).json({ error: error.message });
	}
};

export const deleteProductFromCartController = async (req, res) => {
	try {
		const cartId = req.params.cid;
		const productId = req.params.pid;
		const cartToUpdate = await CartService.getCartById(cartId);

		if (!cartToUpdate) {
			// Handle the case where the cart is not found
			return res
				.status(404)
				.json({ error: `Cart with ID ${cartId} not found.` });
		}

		const productToDelete = await ProductService.getById(productId);

		if (!productToDelete) {
			// Handle the case where the product is not found
			return res
				.status(404)
				.json({ error: `Product with ID ${productId} not found.` });
		}

		// Check if the product with the specified productId is in the cart
		const productIndex = cartToUpdate.products.findIndex(
			(product) => product.productId._id.toString() === productId.toString()
		);

		if (productIndex === -1) {
			// Handle the case where the product is not found in the cart
			return res.status(404).json({
				error: `Product with ID ${productId} not found in cart. perhaps it was already deleted?`,
			});
		} else {
			// Use $pull to remove the product with a specific productId from the products array
			// Check if the product with the specified productId is in the cart
			const updatedProducts = cartToUpdate.products.filter(
				(product) => product.productId._id.toString() !== productId.toString()
			);

			// Update the products array with the filtered result
			cartToUpdate.products = updatedProducts;

			// Save the updated cart
			const updatedCart = await CartService.updateCart(cartToUpdate);

			res.status(200).json(updatedCart);
		}
	} catch (error) {
		// Here we handle any other errors that occur during the request
		console.error("Error deleting product from cart:", error.message);
		res.status(500).json({ error: error.message });
	}
};

export const deleteCartController = async (req, res) => {
	try {
		const cartId = req.params.cid;
		const cartToUpdate = await CartService.getCartById(cartId);

		if (!cartToUpdate) {
			return res.status(404).json({
				error: `cart with id ${cartId} not found!`,
			});
		}

		cartToUpdate.products = [];

		const updatedCart = await CartService.updateCart(cartToUpdate);

		res.status(200).json({ status: "Success", payload: updatedCart });
	} catch (error) {
		console.error(`Error deleting al products from cart ${error.message}`);
		res.status(500).json({ error: error.message });
	}
};
