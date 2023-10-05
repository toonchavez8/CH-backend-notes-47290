import { Router } from "express";
import { privateRoutes, publicRoutes } from "../middlewares/auth.middleware";

const sessionsViewRouter = Router();

sessionsViewRouter.get("/register", privateRoutes, (req, res) => {
	res.render("sessions/register");
});

sessionsViewRouter.get("/", privateRoutes, (req, res) => {
	res.render("sessions/login");
});

sessionsViewRouter.get("/profile", publicRoutes, (req, res) => {
	res.render("sessions/profile");
});

export default sessionsViewRouter;
