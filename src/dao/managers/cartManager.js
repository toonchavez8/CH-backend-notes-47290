import fs from "fs";
import chalk from "chalk";
import { ProductManager } from "./ProductManager.js";

const productmanager = new ProductManager("./data/database.json");
export class CartManager {
	#_cart;
	#cartDBFilePath;

	constructor(cartDBFilePath) {
		this.#_cart = [];

		this.#cartDBFilePath = cartDBFilePath;

		if (cartDBFilePath) {
			this.#loadCartDatabase(cartDBFilePath);
		}
	}

	async #loadCartDatabase(cartDBFilePath) {
		try {
			// Attempt to read the cart database file
			const data = await fs.promises.readFile(cartDBFilePath, "utf-8");
			this.#_cart = JSON.parse(data);
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

	async #saveCartDatabase() {
		try {
			await fs.promises.writeFile(
				this.#cartDBFilePath,
				JSON.stringify(this.#_cart)
			);
		} catch (error) {
			console.error("Error writing to cart database:", error);
		}
	}

	#generateId(data) {
		return data.length === 0 ? 1 : data[data.length - 1].id + 1;
	}

	async createCart() {
		const cartToAdd = { id: this.#generateId(this.#_cart), products: [] };

		this.#_cart.push(cartToAdd);

		try {
			await this.#saveCartDatabase();
		} catch (error) {
			throw new Error(`Error creating cart: ${error.message}`);
		}

		return cartToAdd;
	}

	async getProductsFromCart(cid) {
		console.log(cid);
		const cart = this.#_cart.find((cart) => cart.id === cid);

		if (!cart) {
			throw new Error(`Cart with ID ${cid} not found.`);
		}

		return cart;
	}
	async addProductToCart(cid, pid) {
		try {
			const product = await productmanager.getProductbyId(pid);

			if (typeof product !== "object" || !product.id || !product.title) {
				throw new Error(
					`Product with ID ${pid} not found or has invalid data.`
				);
			}

			const cart = this.#_cart.find((cart) => cart.id === cid);

			if (!cart) {
				throw new Error(`Cart with ID ${cid} not found.`);
			}

			const existingProduct = cart.products.find((p) => p.id === pid);

			if (existingProduct) {
				existingProduct.quantity = (existingProduct.quantity || 0) + 1;
			} else {
				cart.products.push({ id: product.id, quantity: 1 }); // Add only the product ID and quantity
			}

			await this.#saveCartDatabase();

			return cart;
		} catch (error) {
			throw new Error(`Error adding product to cart: ${error.message}`);
		}
	}
}
