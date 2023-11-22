import { Router } from "express";
import passport from "passport";
import * as sessionController from "../controllers/sessionController.js";

const sessionsRouter = Router();

sessionsRouter.post(
	"/register",
	passport.authenticate("register", {
		failureRedirect: "/failregister",
	}),
	sessionController.register
);
sessionsRouter.post(
	"/login",
	passport.authenticate("login", { failureRedirect: "/failregister" }),
	sessionController.login
);
sessionsRouter.get("/logout", sessionController.logout);

export default sessionsRouter;