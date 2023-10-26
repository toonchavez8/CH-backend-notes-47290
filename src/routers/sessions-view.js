import { Router } from "express";
import passport from "passport";
import { JWT_COOKIE_NAME, passportCall } from "../utils.js";

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
	console.log("REQ SESSION", req.user);

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
		failureRedirect: "/failregister", // Handle failed GitHub authentication
	}),
	async (req, res) => {
		if (!req.user) {
			return res
				.status(401)
				.render("error", { error: "passport login failed" });
		}
		res.cookie(JWT_COOKIE_NAME, req.user.token).redirect("/products");
	}
);

export default sessionsViewRouter;
