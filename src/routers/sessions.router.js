import { Router } from "express";

import passport from "passport";
import { JWT_COOKIE_NAME } from "../utils.js";

const sessionsRouter = Router();

sessionsRouter.post(
	"/register",
	passport.authenticate("register", {
		failureRedirect: "/failregister",
	}),
	async (req, res) => {
		console.log("REQ SESSION from register", req.user);
		console.log("req.token", req.token);
		res.redirect("/session/login");
	}
);

sessionsRouter.post(
	"/login",
	passport.authenticate("login", { failureRedirect: "/failregister" }),
	async (req, res) => {
		if (!req.user) {
			return res
				.status(401)
				.render("error", { error: "passport login failed" });
		}
		res.cookie(JWT_COOKIE_NAME, req.user.token).redirect("/products");
	}
);

sessionsRouter.get("/logout", (req, res) => {
	res.clearCookie(JWT_COOKIE_NAME).redirect("/session/login");
});

export default sessionsRouter;
