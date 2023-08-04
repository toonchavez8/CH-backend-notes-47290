import fs from "fs";
import chalk from "chalk";
class ProductManager {
	#_products;

	constructor() {
		this.#_products = [];
		this.loadDatabase();
	}

	async loadDatabase() {
		try {
			const data = await fs.promises.readFile("database.json", "utf-8");
			this.#_products = JSON.parse(data);
		} catch (err) {
			if (err.code === "ENOENT") {
				console.error("Error: Database doesn't exist. Please add products.");
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

	async saveDatabase() {
		try {
			await fs.promises.writeFile(
				"database.json",
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

	async addProduct(title, description, price, thumbnail, code, stock) {
		// Check for missing properties
		if (!title || !description || !price || !thumbnail || !code || !stock) {
			console.error("Error: Missing properties for the product.");
			return;
		}

		// Check for duplicate code
		const isDuplicateCode = this.#_products.some(
			(product) => product.code === code
		);
		if (isDuplicateCode) {
			console.error("Error: Product with the same code already exists.");
			return;
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
	}
	#getNextId() {
		if (this.#_products.length === 0) return 1;
		return this.#_products[this.#_products.length - 1].id + 1;
	}

	async getProductbyId(id) {
		let productTitle = null; // Initialize productTitle variable to store the title

		try {
			const data = await fs.promises.readFile("database.json", "utf-8");
			this.#_products = JSON.parse(data); // Parse the JSON data to convert it to an array

			const product = this.#_products.find((product) => product.id === id);
			if (!product) {
				console.error(`Product with id ${id} not found.`);
				return [];
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
				console.log(chalk.green(`${productTitle} loaded successfully!`));
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

		this.#_products.splice(index, 1);
		await this.saveDatabase();
		console.log(`Product with id ${id} deleted successfully.`);
		return this.#_products;
	}

	async updateProductById(id, updatedProduct) {
		const index = this.#_products.findIndex((product) => product.id === id);
		if (index === -1) {
			console.error(`Product with id ${id} not found.`);
			return null;
		}

		// Combine existing product with updatedProduct
		Object.assign(this.#_products[index], updatedProduct);
		await this.saveDatabase();
		console.log("Product updated successfully and database updated.");
		return this.#_products[index];
	}
}

export const PM = new ProductManager();
