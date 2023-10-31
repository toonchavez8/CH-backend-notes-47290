import productModel from "../dao/models/products.model.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 8080;

export const getAllProducts = async (req, res) => {
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
			prevLink = `http://${req.hostname}:${PORT}${req.originalUrl}?page=${result.prevPage}`;
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

export const getProducts = async (req, res) => {
	try {
		const products = await getAllProducts(req, res);
		res.status(200).json(products); // Return the entire result object
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
		const product = await productModel.findById(id).lean().exec();

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
};

export const updateProduct = async (req, res) => {
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
};

export const deleteProduct = async (req, res) => {
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
};
