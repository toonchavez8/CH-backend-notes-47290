import { Router } from "express";

import { CartService } from "../repositories/index.js";
import { passportCall } from "../utils.js";

const cartsViewsRouter = Router();

cartsViewsRouter.get("/", passportCall("jwt"), async (req, res) => {
	try {
		const user = req.user.user;
		console.log("user", user);

		if (user.role === "user") return res.redirect(`/carts/${user.cart}`);

		const result = await CartService.getAllCarts();

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
		const cid = req.params.cid;

		const cart = await CartService.getCartById(cid);

		// Calculate the total price
		const totalPrice = cart.products.reduce((total, product) => {
			const productPrice = product.productId.price;

			const subtotal = productPrice * product.quantity;

			return total + subtotal;
		}, 0);

		// Format the total price to currency
		const formattedTotalPrice = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD", // Change to your desired currency code
		}).format(totalPrice);

		// Add the total price to the cart object
		cart.totalPrice = formattedTotalPrice;

		console.log("cart", cart);
		res.render("cart", { cart });
	} catch (error) {
		// Handle any potential errors here
		console.error("Error:", error);
		res.status(500).send("Internal Server Error");
	}
});

export default cartsViewsRouter;
