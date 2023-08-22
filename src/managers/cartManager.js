import fs from "fs";
import chalk from "chalk";

export class CartManager {
	#_cart;
	#productDBFilePath;
	#cartDBFilePath;

	constructor(productDBFilePath, cartDBFilePath) {
		this.#_cart = [];

		this.#productDBFilePath = productDBFilePath;
		this.#cartDBFilePath = cartDBFilePath;

		if (cartDBFilePath) {
			this.loadCartDatabase(cartDBFilePath);
		}
	}

	async loadCartDatabase(cartDBFilePath) {
		try {
			// Attempt to read the cart database file
			const data = await fs.promises.readFile(cartDBFilePath, "utf-8");
			return JSON.parse(data);
		} catch (error) {
			if (error.code === "ENOENT") {
				// The file doesn't exist, so create an empty cart database
				await fs.promises.writeFile(cartDBFilePath, "[]", "utf-8");
				return [];
			} else {
				throw error; // Propagate other errors
			}
		} finally {
			console.log(
				chalk.yellow(
					`Cart Database Loaded with ${this.#_cart.length} ${
						this.#_cart.length >= 1 ? "carts" : "cart"
					}`
				)
			);
		}
	}

	async saveCartDatabase() {
		try {
			await fs.promises.writeFile(
				this.#cartDBFilePath,
				JSON.stringify(this.#_cart)
			);
		} catch (error) {
			console.error("Error writing to cart database:", error);
		}
	}
}
