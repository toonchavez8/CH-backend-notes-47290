import { Router } from "express";
import { handlePolicies } from "../middlewares/auth.middleware.js";
import * as ProductController from "../controllers/productController.js";

const productsViewsRouter = Router();

productsViewsRouter.get(
	"/",
	handlePolicies(["USER", "ADMIN", "PREMIUM"]),
	ProductController.getProductsView
);

productsViewsRouter.get(
	"/id/:pid",
	handlePolicies(["USER", "ADMIN", "PREMIUM"]),
	ProductController.getProductByIDView
);

productsViewsRouter.get(
	"/realtimeproducts",
	handlePolicies(["ADMIN", "PREMIUM"]),
	ProductController.realTimeProductsView
);

export default productsViewsRouter;
