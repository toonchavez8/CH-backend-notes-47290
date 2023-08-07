// All imports
import chalk from "chalk";
import { PM } from "./ProductManager.js";

// loading console log
console.log(chalk.yellow("starting ...   "));

// Function to add 5 products
async function addProducts() {
	await PM.addProduct(
		"Product 1",
		"Description 1",
		100,
		"img1.png",
		"P001",
		10
	);
	await PM.addProduct(
		"Product 2",
		"Description 2",
		200,
		"img2.png",
		"P002",
		15
	);
	await PM.addProduct("Product 3", "Description 3", 150, "img3.png", "P003", 5);
	await PM.addProduct(
		"Product 4",
		"Description 4",
		250,
		"img4.png",
		"P004",
		20
	);
	await PM.addProduct(
		"Product 5",
		"Description 5",
		180,
		"img5.png",
		"P005",
		12
	);
}

async function main() {
	console.log(await PM.getProducts()); // []

	await addProducts();

	const product1 = await PM.getProductbyId(1); // Product with id 1 exists
	const product6 = await PM.getProductbyId(6); // Product with id 6 does not exist
	console.log("producto 1", product1);
	console.log("producto 6", product6);

	await PM.updateProductById(1, { price: 120 }); // Update product with id 1
	await PM.deleteProductById(2); // Delete product with id 2 (exists)
	await PM.deleteProductById(7); // Delete product with id 7 (does not exist)

	console.log(await PM.getProducts());
}

main();
