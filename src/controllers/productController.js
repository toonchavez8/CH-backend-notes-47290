import config from "../config/config.js";
import productModel from "../models/products.model.js";
import mongoose from "mongoose";
import { ProductService } from "../repositories/index.js";
import chalk from "chalk";
import CustomError from "../errors/CustomError.js";
import CustomErrorIDs from "../errors/enums.js";
import { generateProducts } from "../mocking/Product.Gen.js";

const PORT = config.APISERVER.PORT;

export const getProducts = async (req, res) => {
	try {
		const products = await ProductService.getAllPaginate(req, PORT);
		// Return the entire result object
		res.status(200).json(products.response); // Return the entire result object
	} catch (error) {
		console.log("Error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getProductById = async (req, res) => {
	try {
		// Extract the product ID from the request parameters
		const id = req.params.pid;

		// Check if the provided ID is a valid ObjectId
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ error: "Invalid product ID." });
		}

		// Find the product by ID using findById
		const product = await ProductService.getById(id);
		console.log("getProductById", product);

		if (!product) {
			return res.status(404).json({ error: "Product not found." });
		}

		res.status(200).json({ payload: product });
	} catch (error) {
		console.log(chalk.red("Error fetching product:", error.message));
		res.status(500).json({ error: error.message });
	}
};

export const addProduct = async (req, res) => {
	try {
		// Extract product data from the request body
		const product = req.body;
		console.log(product);

		// Save the new product to the database
		const addedProduct = await ProductService.create(product);
		console.log(addedProduct);

		const getAllProducts = await ProductService.getAll();

		// Respond with a success message and the added product
		res.status(201).json({
			message: "Product added successfully.",
			payload: getAllProducts,
		});
	} catch (error) {
		console.log(chalk.red("Error adding product:", error.message));
		res.status(500).json({ error: error.message });
	} finally {
		if (res.statusCode == 201) {
			console.log(chalk.green("Post completed successfully"));
		} else {
			console.log(chalk.yellow("Post failed"));
		}
	}
};

export const updateProduct = async (req, res) => {
	try {
		// Extract the product ID from the request parameters
		const id = req.params.pid;

		// Create an object with the updated product data
		const updatedProductdata = req.body;

		// Call the updateProductById method to update the product by ID
		const updatedProduct = await ProductService.update(id, updatedProductdata, {
			new: true,
		});

		// Check if the product was successfully updated
		if (!updatedProduct) {
			return res
				.status(404)
				.json({ error: `Product with ID ${id} not found.` });
		}

		// Respond with a success message and the updated product
		res.status(200).json({
			message: "Product updated successfully.",
			product: updatedProduct,
		});
	} catch (error) {
		console.log(chalk.red("Error updating product:", error.message));
		res.status(500).json({ error: error.message });
	}
};

export const deleteProduct = async (req, res) => {
	let deletedProduct; // Declare the variable here

	try {
		// Extract the product ID from the request parameters
		const id = req.params.pid;

		// Use productModel.findByIdAndRemove to delete the product by ID
		deletedProduct = await ProductService.delete(id);

		// Check if the product was successfully deleted
		if (!deletedProduct) {
			return res
				.status(404)
				.json({ error: `Product with ID ${id} not found.` });
		}

		// Respond with a success message
		res.status(200).json({
			message: "Product deleted successfully.",
			productDeleted: deletedProduct,
		});
	} catch (error) {
		console.log(chalk.red("Error deleting product:", error.message));
		res.status(500).json({ error: error.message });
	} finally {
		// Display the deleted product in the console
		if (deletedProduct) {
			console.log(
				chalk.green(`Product with ID ${deletedProduct._id} deleted:`)
			);
			console.log(deletedProduct);
		}
	}
};

export const getProductsView = async (req, res) => {
	try {
		const filterOptions = {}; // Initialize an empty filter object

		// Check if the 'category' query parameter exists and add it to filterOptions if provided
		if (req.query.category) {
			filterOptions.category = req.query.category;
		}

		const products = await ProductService.getAllPaginate(req, filterOptions); // Pass the filterOptions to getAllProducts

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

			// Add an "All Categories" option to the categories array
			categories.unshift("All Categories");

			const user = req.user?.user; // Safely access the user object using optional chaining

			const cartID = user?.cart; // Safely access the cart object using optional chaining
			console.log("carid from home", cartID);

			// Check if the user is logged in and if they are an admin
			const isAdmin = user?.role === "admin"; // Check if the user is an admin

			const paginateInfo = {
				hasPrevPage: products.response.hasPrevPage,
				hasNextPage: products.response.hasNextPage,
				prevLink: products.response.prevLink,
				nextLink: products.response.nextLink,
				totalPages,
			};

			// Include cartID in the products payload
			const updatedProducts = products.response.payload.map((product) => ({
				...product,
				cartID: cartID,
			}));
			res.render("home", {
				isAdmin,
				user,
				products: updatedProducts,
				paginateInfo,
				categories,
				cartID,
			});
		}
	} catch (error) {
		// Handle any potential errors here
		console.error("Error:", error);
		res.status(500).send("Internal Server Error");
	}
};

export const getProductByIDView = async (req, res) => {
	try {
		// Extract the product ID from the request parameters
		const id = req.params.pid;

		// Check if the provided ID is a valid ObjectId
		if (!mongoose.Types.ObjectId.isValid(id)) {
			CustomError.createError({
				name: "Invalid ID",
				message: "The provided ID is not a valid ObjectId.",
				code: CustomErrorIDs.DATABASE_ERROR,
				cause: "Invalid ID",
			});
		}

		// Find the product by ID using findById
		const product = await ProductService.getById(id);

		if (!product) {
			return res.status(404).json({ error: "Product not found." });
		}
		const user = req.user?.user; // Safely access the user object using optional chaining

		const cartID = user?.cart; // Safely access the cart object using optional chaining

		res.render("productPage", { product, cartID }); // Pass the product object to the template
	} catch (error) {
		console.log("Error fetching product:", error.message);
		res.status(500).json({ error: error.message });
	}
};

export const realTimeProductsView = async (req, res) => {
	try {
		const products = await ProductService.getAll();
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
};

export const mockingproducts = async (req, res) => {
	try {
		// Generate mock products
		const mockProducts = generateProducts();

		// Save mock products to the database
		for (const mockProduct of mockProducts) {
			await ProductService.create(mockProduct);
		}

		res.status(201).json({
			message: "Mock products added successfully.",
			payload: mockProducts,
		});
	} catch (error) {
		console.log("Error mocking products:", error.message);
		res.status(500).json({ error: error.message });
	}
};
