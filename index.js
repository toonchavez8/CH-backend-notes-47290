// All imports
import chalk from "chalk";
import { PM } from "./clase-02-desafio/Productmanager.js";

// loading console log
console.log(chalk.yellow("starting ...   "));

PM.addProduct(
	"Samsung S20",
	"Smartphone",
	1200,
	"samsung-s20.jpg",
	"S20-01",
	50
);

console.log("products", PM.getProducts());
