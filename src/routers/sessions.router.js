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

sessionsRouter.delete("/user/:email", sessionController.deleteUser);
sessionsRouter.get("/logout", sessionController.logout);

sessionsRouter.post("/forgot-password", sessionController.forgotPassword);

sessionsRouter.post("/reset-password/:user", sessionController.resetPassword);

sessionsRouter.post("/premium/:email", sessionController.togglePremium);
export default sessionsRouter;
