import { Router } from "express";
import { ProductManager } from "../dao/managers/ProductManager.js";
import chalk from "chalk";
import productModel from "../dao/models/products.model.js";
import mongoose from "mongoose";

// declared variables
const productRouter = Router();
const databaseFilePath = "./data/database.json";

// create new class with db file path
const PM = new ProductManager(databaseFilePath);

const getProducts = async (req, res) => {
	try {
		const limit = req.query.limit || 10;
		const page = req.query.page || 1;

		const filterOptions = {};

		if (req.query.stock) filterOptions.stock = req.query.stock;
		if (req.query.category) filterOptions.category = req.query.category;

		const paginateOptions = { lean: true, limit, page };

		if (req.query.sort === "asc") paginateOptions.sort = { price: 1 };
		if (req.query.sort === "desc") paginateOptions.sort = { price: -1 };

		const result = await productModel.paginate(filterOptions, paginateOptions);

		let prevLink;

		if (!req.query.page) {
			prevLink = `http://${req.hostname}:${PORT}${req.originalUrl}&page=${result.prevPage}`;
		} else {
			const modifiedUrl = req.originalUrl.replace(
				`page=${req.query.page}`,
				`page=${result.prevPage}`
			);
			prevLink = `http://${req.hostname}:${PORT}${modifiedUrl}`;
		}
		let nextLink;

		if (!req.query.page) {
			nextLink = `http://${req.hostname}:${PORT}${req.originalUrl}&page=${result.nextPage}`;
		} else {
			const modifiedUrl = req.originalUrl.replace(
				`page=${req.query.page}`,
				`page=${result.nextPage}`
			);
			nextLink = `http://${req.hostname}:${PORT}${modifiedUrl}`;
		}

		return {
			statusCode: 200,
			response: {
				status: "success",
				payload: result.docs,
				totalPages: result.totalPages,
				prevPage: result.prevPage,
				nextPage: result.nextPage,
				page: result.page,
				hasPrevPage: result.hasPrevPage,
				hasNextPage: result.hasNextPage,
				prevLink: result.hasPrevPage ? prevLink : null,
				nextLink: result.hasNextPage ? nextLink : null,
			},
		};
	} catch (error) {
		return {
			statusCode: 500,
			response: {
				status: "error",
				error: error.message,
			},
		};
	}
};

// router path to get all products
productRouter.get("/", async (req, res) => {
	const products = await getProducts(req, res);
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

// productRouter path to get product by id
productRouter.get("/:pid", async (req, res) => {
	try {
		// Extract the product ID from the request parameters
		const id = req.params.pid;

		// Check if the provided ID is a valid ObjectId
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ error: "Invalid product ID." });
		}

		// Find the product by ID using findById
		const product = await productModel.findById(id).lean().exec();

		if (!product) {
			return res.status(404).json({ error: "Product not found." });
		}

		res.status(200).json({ payload: product });
	} catch (error) {
		console.log(chalk.red("Error fetching product:", error.message));
		res.status(500).json({ error: error.message });
	}
});

// Create a new POST route for adding products
productRouter.post("/", async (req, res) => {
	try {
		// Extract product data from the request body
		const { title, description, price, thumbnail, code, stock, category } =
			req.body;

		// Create a new product using the productModel
		const newProduct = new productModel({
			title,
			description,
			price,
			thumbnail,
			code,
			stock,
			category,
		});

		// Save the new product to the database
		const addedProduct = await newProduct.save();

		// Respond with a success message and the added product
		res.status(201).json({
			message: "Product added successfully.",
			payload: addedProduct,
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
});

// route to update product by id

productRouter.put("/:pid", async (req, res) => {
	try {
		// Extract the product ID from the request parameters
		const id = req.params.pid;

		// Create an object with the updated product data
		const updatedProductdata = req.body;

		// Call the updateProductById method to update the product by ID
		const updatedProduct = await productModel.findByIdAndUpdate(
			id,
			updatedProductdata,
			{
				new: true,
			}
		);

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
});

productRouter.delete("/:pid", async (req, res) => {
	let deletedProduct; // Declare the variable here

	try {
		// Extract the product ID from the request parameters
		const id = req.params.pid;

		// Use productModel.findByIdAndRemove to delete the product by ID
		deletedProduct = await productModel.findByIdAndRemove(id);

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
});

export { getProducts, productRouter };
