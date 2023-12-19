import { Router } from "express";
import {
	getProducts,
	getProductById,
	addProduct,
	updateProduct,
	deleteProduct,
	mockingproducts,
	realTimeProducts,
} from "../controllers/productController.js";
import { handlePolicies } from "../middlewares/auth.middleware.js";
import { passportCall } from "../utils.js";

// declared variables
const productRouter = Router();

// router path to get all products
productRouter.get(
	"/",
	passportCall("jwt"),
	handlePolicies(["USER", "ADMIN", "PREMIUM"]),
	getProducts
);

// productRouter path to get product by id
productRouter.get(
	"/:pid",
	passportCall("jwt"),
	handlePolicies(["USER", "ADMIN", "PREMIUM"]),
	getProductById
);

// Create a new POST route for adding products
productRouter.post(
	"/",
	passportCall("jwt"),
	handlePolicies(["ADMIN", "PREMIUM"]),
	addProduct
);

// route to update product by id
productRouter.put(
	"/:pid",
	passportCall("jwt"),
	handlePolicies(["ADMIN", "PREMIUM"]),
	updateProduct
);

productRouter.delete(
	"/:pid",
	passportCall("jwt"),
	handlePolicies(["ADMIN", "PREMIUM"]),
	deleteProduct
);

productRouter.get(
	"/realtime/products",
	passportCall("jwt"),
	handlePolicies(["ADMIN", "PREMIUM"]),
	realTimeProducts
);

productRouter.get("/create/mockingproducts", mockingproducts);

export { productRouter };
