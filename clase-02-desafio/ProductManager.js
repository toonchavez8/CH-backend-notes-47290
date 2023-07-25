class ProductManager {
	// private method
	#_products;
	// Add constructor
	constructor() {
		this.#_products = [];
	}

	getProducts() {
		return this.#_products;
	}

	addProduct(title, description, price, thumnail, code, stock) {
		// Check for missing properties
		if (!title || !description || !price || !thumnail || !code || !stock) {
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
			title,
			description,
			price,
			thumnail,
			code,
			stock,
			id: this.#getNextId(),
		};

		this.#_products.push(product);
	}

	#getNextId() {
		if (this.#_products.length === 0) return 1;
		return this.#_products[this.#_products.length - 1].id + 1;
	}

	getProductbyId(id) {
		const product = this.#_products.find((product) => product.id === id);
		if (!product) {
			console.error(`Product with id ${id} not found.`);
			return;
		}
		return product;
	}
}

export const PM = new ProductManager();
