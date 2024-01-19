import { Router } from "express";
import passport from "passport";
import { passportCall } from "../utils.js";
import * as sessionController from "../controllers/sessionController.js";
import UserDTO from "../dto/user.DTO.js";
import UserModel from "../models/users.model.js";
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

sessionsViewRouter.get("/profile", passportCall("jwt"), async (req, res) => {
	try {
		const user = await UserModel.findById(req.user.user._id);
		const { role, _id, ...userWithoutRole } = user.toObject();

		const UID = _id.toString();

		let RoleAdmin;
		let isPremiumRole;
		let isRegularRole;

		if (role === "user") {
			const userDto = new UserDTO(userWithoutRole);
			isRegularRole = true;
			res.render("sessions/profile", {
				user: userDto,
				RoleAdmin,
				isPremiumRole,
				isRegularRole,
				UID, // Include UID in the data object
			});
		} else if (role === "premium") {
			const userDto = new UserDTO(userWithoutRole);
			isPremiumRole = true;
			res.render("sessions/profile", {
				user: userDto,
				RoleAdmin,
				isPremiumRole,
				UID, // Include UID in the data object
			});
		} else if (role === "admin") {
			RoleAdmin = true;
			res.render("sessions/profile", {
				user,
				RoleAdmin,
				isPremiumRole,
				UID, // Include UID in the data object
			});
		}
	} catch (error) {
		console.error("Error fetching user:", error);
		res.status(500).render("error", { error: "Internal Server Error" });
	}
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

sessionsViewRouter.get("/session/forgot-password", (req, res) => {
	res.render("sessions/forgot-password");
});

sessionsViewRouter.get(
	"/session/reset-password/:token",
	sessionController.verfiyToken
);

export default sessionsViewRouter;
