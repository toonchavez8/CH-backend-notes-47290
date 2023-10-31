import { Router } from "express";
import passport from "passport";
import { passportCall } from "../utils.js";
import * as sessionController from "../controllers/sessionController.js";
const sessionsViewRouter = Router();

sessionsViewRouter.get("/register", (req, res) => {
	res.render("sessions/register");
});

sessionsViewRouter.get("/failregister", (req, res) => {
	res.status(401).render("error", { error: "passport register failed" });
});

sessionsViewRouter.get("/", passportCall("jwt"), (req, res) => {
	if (req.user.user) return res.redirect("/products");
	res.render("sessions/login");
});

sessionsViewRouter.get("/profile", passportCall("jwt"), (req, res) => {
	res.render("sessions/profile", req.user.user);
});

sessionsViewRouter.get(
	"/login/github",
	passport.authenticate("github", { scope: ["user:email"] }),
	(req, res) => {
		res.render("error", { error: "login via github" });
	}
);

sessionsViewRouter.get("/session/login", (req, res) => {
	res.render("sessions/login");
});

sessionsViewRouter.get(
	"/session/githubcallback",
	passport.authenticate("github", {
		failureRedirect: "/failregister",
	}),
	sessionController.login
);

export default sessionsViewRouter;
