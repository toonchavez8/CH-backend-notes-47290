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
		res.redirect("/");
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
		req.session.user = req.user;

		console.log("REQ SESSION", req.session);
		console.log("Req.user", req.user);
		res.cookie(JWT_COOKIE_NAME, req.user.token).redirect("/products");
	}
);

sessionsRouter.get("/logout", (req, res) => {
	req.session.destroy((error) => {
		if (error) {
			console.log(error);
			res.status(500).render("error", { error: error });
		} else res.redirect("/");
	});
});

export default sessionsRouter;
