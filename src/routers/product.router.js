import { Router } from "express";
import {
	getProducts,
	getProductById,
	addProduct,
	updateProduct,
	deleteProduct,
	mockingproducts,
} from "../controllers/productController.js";
import { handlePolicies } from "../middlewares/auth.middleware.js";
import { passportCall } from "../utils.js";

// declared variables
const productRouter = Router();

// router path to get all products
productRouter.get(
	"/",
	// passportCall("jwt"),
	// handlePolicies(["USER", "ADMIN"]),
	getProducts
);

// productRouter path to get product by id
productRouter.get(
	"/:pid",
	passportCall("jwt"),
	handlePolicies(["USER", "ADMIN"]),
	getProductById
);

// Create a new POST route for adding products
productRouter.post(
	"/",
	passportCall("jwt"),
	handlePolicies(["ADMIN"]),
	addProduct
);

// route to update product by id
productRouter.put(
	"/:pid",
	passportCall("jwt"),
	handlePolicies(["ADMIN"]),
	updateProduct
);

productRouter.delete(
	"/:pid",
	passportCall("jwt"),
	handlePolicies(["ADMIN"]),
	deleteProduct
);

productRouter.get("/create/mockingproducts", mockingproducts);

export { productRouter };
