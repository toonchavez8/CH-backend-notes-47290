import { Router } from "express";
import cartModel from "../dao/models/carts.model.js";
import { getProductsFromCart } from "../controllers/cartController.js";

const cartsViewsRouter = Router();

cartsViewsRouter.get("/", async (req, res) => {
	try {
		const result = await cartModel
			.find()
			.populate("products.productId")
			.lean()
			.exec();

		console.log(result);
		res.render("allcarts", { result });
	} catch (error) {
		// Handle any potential errors here
		console.error("Error:", error);
		res.status(500).send("Internal Server Error");
	}
});

cartsViewsRouter.get("/:cid", async (req, res) => {
	try {
		const result = await getProductsFromCart(req, res);

		const cart = result.response.payload;

		res.render("cart", { cart });
	} catch (error) {
		// Handle any potential errors here
		console.error("Error:", error);
		res.status(500).send("Internal Server Error");
	}
});

export default cartsViewsRouter;
