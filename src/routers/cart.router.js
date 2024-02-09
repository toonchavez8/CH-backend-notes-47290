import { Router } from "express";

import {
	getAllCartsController,
	createCartController,
	updateCartController,
	getCartByIDController,
	addProductToCartController,
	clearCartController,
	deleteProductFromCartController,
	checkoutCartController,
	deleteCartController,
	successStripePayment,
} from "../controllers/cartController.js";
import { passportCall } from "../utils.js";
import getBill from "../controllers/checkoutController.js";

const cartRouter = Router();

cartRouter.get("/", getAllCartsController);
cartRouter.post("/", createCartController);
cartRouter.put("/:cid/product/:pid", updateCartController);
cartRouter.get("/:cid", getCartByIDController);
cartRouter.post("/:cid/product/:pid", addProductToCartController);
cartRouter.delete("/:cid/product/:pid", deleteProductFromCartController);
cartRouter.delete("/:cid", clearCartController);
cartRouter.delete("/delete/cart/:email", deleteCartController);
cartRouter.post("/:cid/purchase", passportCall("jwt"), checkoutCartController);

cartRouter.get("/stripe/success/:purchaseCode", successStripePayment);
cartRouter.get("/stripe/cancel", (req, res) => {
	res.send("cancel");
});
cartRouter.post("/getbill/:ticket", getBill);
export { cartRouter };
