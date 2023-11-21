import { Router } from "express";
import { handlePolicies } from "../middlewares/auth.middleware.js";
import * as ProductController from "../controllers/productController.js";

const productsViewsRouter = Router();

productsViewsRouter.get(
	"/",
	handlePolicies(["USER", "ADMIN"]),
	ProductController.getProductsView
);

productsViewsRouter.get(
	"/id/:pid",
	handlePolicies(["USER", "ADMIN"]),
	ProductController.getProductByIDView
);

productsViewsRouter.get(
	"/realtimeproducts",
	handlePolicies(["USER", "ADMIN"]),
	ProductController.realTimeProductsView
);

export default productsViewsRouter;
