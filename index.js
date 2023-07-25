// All imports
import chalk from "chalk";
import { PM } from "./ProductManager.js";

// loading console log
console.log(chalk.yellow("starting ...   "));

console.log("products", PM.getProducts());
