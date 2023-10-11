import { Router } from "express";
import { privateRoutes, publicRoutes } from "../middlewares/auth.middleware.js";

const sessionsViewRouter = Router();

sessionsViewRouter.get("/register", privateRoutes, (req, res) => {
	res.render("sessions/register");
});

sessionsViewRouter.get("/failregister", (req, res) => {
	res.status(401).render("error", { error: "passport register failed" });
});

sessionsViewRouter.get("/", privateRoutes, (req, res) => {
	res.render("sessions/login");
});

sessionsViewRouter.get("/profile", publicRoutes, (req, res) => {
	console.log("REQ SESSION", req.session);

	res.render("sessions/profile", req.session.user);
});

export default sessionsViewRouter;
