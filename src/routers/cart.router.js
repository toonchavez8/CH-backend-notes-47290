import { Router } from "express";
import chalk from "chalk";
import { CartManager } from "../dao/managers/cartManager.js";
import cartModel from "../dao/models/carts.model.js";
import productModel from "../dao/models/products.model.js";
import * as cartController from "../controllers/cartController.js";

const cartRouter = Router();
const cartDBFilePath = "./data/cartdb.json";

const cartManager = new CartManager(cartDBFilePath);

// get all carts to be deleted later
cartRouter.get("/", cartController.getAllCarts);

// create a cart
cartRouter.post("/", cartController.createCart);

// update a product in a cart
cartRouter.put("/:cid/product/:pid", cartController.updateCart);

// get a cart by id
cartRouter.get("/:cid", cartController.getCartByID);

cartRouter.post("/:cid/product/:pid", cartController.addProductToCart);

cartRouter.delete("/:cid/product/:pid", cartController.deleteProductFromCart);

cartRouter.delete("/:cid", cartController.deleteCart);

export { cartRouter };
