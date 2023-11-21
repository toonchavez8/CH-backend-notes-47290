import { Router } from "express";

import {
	getAllCartsController,
	createCartController,
	updateCartController,
	getCartByIDController,
	addProductToCartController,
	deleteCartController,
	deleteProductFromCartController,
} from "../controllers/cartController.js";

const cartRouter = Router();

cartRouter.get("/", getAllCartsController);
cartRouter.post("/", createCartController);
cartRouter.put("/:cid/product/:pid", updateCartController);
cartRouter.get("/:cid", getCartByIDController);
cartRouter.post("/:cid/product/:pid", addProductToCartController);
cartRouter.delete("/:cid/product/:pid", deleteProductFromCartController);
cartRouter.delete("/:cid", deleteCartController);

export { cartRouter };
