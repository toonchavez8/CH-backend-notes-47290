import fs from "fs";
import chalk from "chalk";

export class ProductManager {
	#_products;
	#databaseFilePath;

	constructor(databaseFilePath) {
		this.#_products = [];
		this.#databaseFilePath = databaseFilePath; // Store the database file path
		if (databaseFilePath) {
			this.loadDatabase(databaseFilePath);
		}
	}

	async loadDatabase(databaseFilePath) {
		try {
			const data = await fs.promises.readFile(databaseFilePath, "utf-8");
			this.#_products = JSON.parse(data);
		} catch (err) {
			if (err.code === "ENOENT") {
				console.error("Error: Database doesn't exist or is empty.");
			} else {
				console.error("Error reading from database:", err);
			}
			this.#_products = [];
		} finally {
			console.log(
				chalk.yellow(
					`Database Loaded with ${this.#_products.length} ${
						this.#_products.length > 1 ? "products" : "product"
					}`
				)
			);
		}
	}

	async saveDatabase(databaseFilePath = null) {
		if (!databaseFilePath) {
			databaseFilePath = this.#databaseFilePath; // Use the original database file path
		}

		try {
			await fs.promises.writeFile(
				databaseFilePath,
				JSON.stringify(this.#_products)
			);
		} catch (err) {
			console.error("Error writing to database:", err);
		} finally {
			console.log(chalk.green("Database saved successfully!"));
		}
	}

	async getProducts() {
		return this.#_products;
	}

	async addProduct(data) {
		const { title, description, price, thumbnail, code, stock } = data;
		// Check for missing properties
		let errorMessage = "";

		switch (true) {
			case !title:
				errorMessage = "Missing title for the product.";
				break;
			case !description:
				errorMessage = "Missing description for the product.";
				break;
			case !price:
				errorMessage = "Missing price for the product.";
				break;
			case !thumbnail:
				errorMessage = "Missing thumbnail for the product.";
				break;
			case !code:
				errorMessage = "Missing code for the product.";
				break;
			case !stock:
				errorMessage = "Missing stock for the product.";
				break;
		}

		if (errorMessage) {
			throw new Error(errorMessage);
		}

		// Check for duplicate code
		const isDuplicateCode = this.#_products.some(
			(product) => product.code === code
		);
		if (isDuplicateCode) {
			console.error("Error: Product with the same code already exists.");
			throw new Error("Product with the same code already exists.");
		}

		const product = {
			id: this.#getNextId(),
			title,
			description,
			price,
			thumbnail,
			code,
			stock,
		};

		this.#_products.push(product);
		await this.saveDatabase();
		console.log("Product added successfully and database updated.");
		return product;
	}
	#getNextId() {
		if (this.#_products.length === 0) return 1;
		return this.#_products[this.#_products.length - 1].id + 1;
	}

	async getProductbyId(id) {
		let productTitle = null; // Initialize productTitle variable to store the title

		try {
			const product = this.#_products.find((product) => product.id === id);
			if (!product) {
				console.error(`Product with id ${id} not found.`);
				return {};
			}

			productTitle = product.title; // Store the product title in the variable
			return product;
		} catch (err) {
			if (err.code === "ENOENT") {
				console.error("Error: Database doesn't exist. Please add products.");
			} else {
				console.error("Error reading from database:", err);
			}
			return null;
		} finally {
			if (productTitle != null) {
				// Now you can access the productTitle in the finally block
				console.log(
					chalk.green(
						`product named ${productTitle} with id ${id} loaded successfully!`
					)
				);
			} else {
				console.log(chalk.yellow("No product found."));
			}
		}
	}
	async deleteProductById(id) {
		const index = this.#_products.findIndex((product) => product.id === id);
		if (index === -1) {
			console.error(`Product with id ${id} not found.`);
			return null;
		}

		// Remove the product from the array and store it in a variable
		const deletedProduct = this.#_products.splice(index, 1)[0];

		await this.saveDatabase();
		console.log(`Product with id ${id} deleted successfully.`);

		// Return the deleted product
		return deletedProduct;
	}

	async updateProductById(id, updatedProduct) {
		const index = this.#_products.findIndex((product) => product.id === id);
		if (index === -1) {
			console.error(`Product with id ${id} not found.`);
			throw new Error(`Product with id ${id} not found.`);
		}

		// Loop through the properties of the updatedProduct and update the corresponding properties of the existing product
		for (const prop in updatedProduct) {
			if (updatedProduct.hasOwnProperty(prop)) {
				this.#_products[index][prop] = updatedProduct[prop];
			}
		}

		await this.saveDatabase();
		console.log("Product updated successfully and database updated.");
		return this.#_products[index];
	}

	async getProductsByOwner(email) {
		const products = this.#_products.filter(
			(product) => product.owner === email
		);
		return products;
	}
}
