import { Router } from "express";
import { ProductManager } from "../dao/managers/ProductManager.js";

const viewsRouter = Router();
const productmanager = new ProductManager("./data/database.json");

viewsRouter.get("/", async (req, res) => {
	const products = await productmanager.getProducts();
	res.render("home", { products });
	console.log(products);
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
	const products = await productmanager.getProducts();
	res.render("realTimeProducts", { products });
});

export default viewsRouter;
