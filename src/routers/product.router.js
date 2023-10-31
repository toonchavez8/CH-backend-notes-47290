import { Router } from "express";
import * as ProductController from "../controllers/productController.js";

// declared variables
const productRouter = Router();

// router path to get all products
productRouter.get("/", ProductController.getProducts);

// productRouter path to get product by id
productRouter.get("/:pid", ProductController.getProductById);

// Create a new POST route for adding products
productRouter.post("/", ProductController.addProduct);

// route to update product by id
productRouter.put("/:pid", ProductController.updateProduct);

productRouter.delete("/:pid", ProductController.deleteProduct);

export { productRouter };
