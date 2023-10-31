import { Router } from "express";
import { publicRoutes } from "../middlewares/auth.middleware.js";
import * as ProductController from "../controllers/productController.js";

const productsViewsRouter = Router();

productsViewsRouter.get("/", publicRoutes, ProductController.getProductsView);

productsViewsRouter.get(
	"/id/:pid",
	publicRoutes,
	ProductController.getProductByIDView
);

productsViewsRouter.get(
	"/realtimeproducts",
	publicRoutes,
	ProductController.realTimeProductsView
);

export default productsViewsRouter;
