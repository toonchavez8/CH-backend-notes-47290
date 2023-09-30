import { Router } from "express";
import { ProductManager } from "../dao/managers/ProductManager.js";
import chalk from "chalk";
import productModel from "../dao/models/products.model.js";
import mongoose from "mongoose";

// declared variables
const router = Router();
const databaseFilePath = "./data/database.json";

// create new class with db file path
const PM = new ProductManager(databaseFilePath);

// router path to get all products
router.get("/", async (req, res) => {
	const products = await productModel.find().lean().exec();
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

// router path to get product by id
router.get("/:pid", async (req, res) => {
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
router.post("/", async (req, res) => {
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

router.put("/:pid", async (req, res) => {
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

router.delete("/:pid", async (req, res) => {
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

export default router;
