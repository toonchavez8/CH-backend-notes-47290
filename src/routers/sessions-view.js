import { Router } from "express";
import { privateRoutes, publicRoutes } from "../middlewares/auth.middleware.js";
import passport, { Passport } from "passport";

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

sessionsViewRouter.get(
	"/login/github",
	passport.authenticate("github", { scope: ["user:email"] }),
	(req, res) => {
		res.render("error", { error: "login via github" });
	}
);

sessionsViewRouter.get(
	"/session/githubcallback",
	passport.authenticate("github", {
		failureRedirect: "/error", // Handle failed GitHub authentication
	}),
	(req, res) => {
		req.session.user = req.user;
		res.redirect("/products"); // Redirect to the profile page upon successful GitHub authentication
	}
);

export default sessionsViewRouter;
