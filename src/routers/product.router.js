import { Router } from "express";
import {
	getProducts,
	getProductById,
	addProduct,
	updateProduct,
	deleteProduct,
} from "../controllers/productController.js";
import { handlePolicies } from "../middlewares/auth.middleware.js";

// declared variables
const productRouter = Router();

// router path to get all products
productRouter.get("/", handlePolicies(["USER", "ADMIN"]), getProducts);

// productRouter path to get product by id
productRouter.get("/:pid", handlePolicies(["USER", "ADMIN"]), getProductById);

// Create a new POST route for adding products
productRouter.post("/", handlePolicies(["ADMIN"]), addProduct);

// route to update product by id
productRouter.put("/:pid", handlePolicies(["ADMIN"]), updateProduct);

productRouter.delete("/:pid", handlePolicies(["ADMIN"]), deleteProduct);

export { productRouter };
