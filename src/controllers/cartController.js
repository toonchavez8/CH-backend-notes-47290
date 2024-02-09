import {
	CartService,
	ProductService,
	TicketService,
} from "../repositories/index.js";
import shortid from "shortid";
import config from "../config/config.js";
import Stripe from "stripe";
import { PORT } from "../app.js";

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
		console.log("🚀 ~ addProductToCartController ~ cartId:", cartId);
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
		console.error("Error adding product to cart from api:", error.message);
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

export const clearCartController = async (req, res) => {
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

export const deleteCartController = async (req, res) => {
	try {
		const email = req.params.email;

		const cartToDelete = await CartService.deleteCart(email);

		if (!cartToDelete) {
			return res
				.status(404)
				.json({ error: `Cart with email ${email} not found` });
		}

		res
			.status(200)
			.json({ status: "success", message: `deleted cart for user ${email}` });
	} catch (error) {}
};

//stripe create order based on succesful products
const stripe = new Stripe(config.STRIPE.SECRET_KEY);

export const checkoutCartController = async (req, res) => {
	try {
		// Get the cartId from the request params
		const cartId = req.params.cid;

		// Get the cart from the database
		const cartToPurchase = await CartService.getCartById(cartId);

		// If cart doesnt exist return 404
		if (!cartToPurchase) {
			return res
				.status(404)
				.json({ error: `Cart with id ${cartId} not found!` });
		}

		const successfulPurchases = [];

		const failedPurchases = [];

		let totalAmount = 0;

		// Loop through the cart products
		for (const cartProduct of cartToPurchase.products) {
			const { productId, quantity } = cartProduct;

			// Get the product data from the database
			const productToPurchase = await ProductService.getById(productId._id);

			// If product doesnt exist push to failed purchases array
			if (!productToPurchase) {
				failedPurchases.push({
					productId: productId._id,
					quantity: quantity,
					error: `Product with id=${productId._id} does not exist. Cannot purchase this product.`,
				});
				continue; // Move to the next iteration
			}

			// if the product more than the quanity requested, add to successfulPurchases
			if (quantity <= productToPurchase.stock) {
				// Update product stock
				productToPurchase.stock -= quantity;

				await ProductService.update(productToPurchase._id, {
					stock: productToPurchase.stock,
				});

				// Calculate total amount
				totalAmount += productToPurchase.price * quantity;

				// Add product details to successfulPurchases
				successfulPurchases.push({
					...productToPurchase,
					quantity: quantity,
				});
			} else {
				// If the product stock is less than the quantity, add to failedPurchases
				failedPurchases.push({
					productId: productId._id,
					quantity: quantity,
					error: `Product with id=${productId._id} and title ${productId.title} does not have enough stock. Cannot purchase this product. Stock: ${productToPurchase.stock}`,
				});
			}
		}

		// Set up Cart with and empty products and add successful purchases and failed purchases to db
		const data = {
			_id: cartToPurchase._id,
			products: cartToPurchase.products,
			successfulPurchases: successfulPurchases,
			failedPurchases: failedPurchases,
		};

		const productDataOBJ = successfulPurchases.map((product) => ({
			price_data: {
				currency: "usd",
				unit_amount: product.price * 100,
				product_data: {
					name: product.title,
					description: product.description,
					images: product.thumbnail,
				},
			},
			quantity: product.quantity,
		}));

		const ticketCode = shortid.generate();
		const stripeCheckoutSession = await stripe.checkout.sessions.create({
			line_items: productDataOBJ,
			mode: "payment",
			success_url: `http://${req.hostname}:${PORT}/api/cart/stripe/success/${ticketCode}`,
			cancel_url: `http://${req.hostname}:${PORT}/api/cart/stripe/cancel`,
		});

		// Update cart with products that were successfully purchased
		await CartService.updateCart(data);

		if (totalAmount !== 0 || successfulPurchases.length !== 0) {
			return res.status(201).json({
				status: "success",
				payload: {
					stripeSession: stripeCheckoutSession,
				},
				message: `Successfully purchased products. Ticket code: ${ticketCode}`,
				failedPurchases: failedPurchases,
			});
		} else {
			return res.status(406).json({
				status: "error",
				payload: failedPurchases,
				message: `${failedPurchases[0].error}`,
			});
		}
	} catch (error) {
		console.error(`Error checking out cart: ${error.message}`);
		return res.status(500).json({ status: "error", error: error.message });
	}
};

export const successStripePayment = async (req, res) => {
	const purchaseCode = req.params.purchaseCode;
	// const ticketResult = await TicketService.create({
	// 	purchaseCode: ticketCode,
	// 	products: successfulPurchases,
	// 	totalAmount,
	// 	buyerEmail: purchaserEmail,
	// });
	// // Update product stock
	// productToPurchase.stock -= quantity;

	// await ProductService.update(productToPurchase._id, {
	// 	stock: productToPurchase.stock,
	// });

	// // Calculate total amount
	// totalAmount += productToPurchase.price * quantity;
	res.send(
		`<h1>Thank you for your purchase</h1> <h3>Your purchase code is: ${purchaseCode}</h3>`
	);
};
