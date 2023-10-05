import { Router } from "express";
import UserModel from "../dao/models/users.model.js";

const sessionsRouter = Router();

sessionsRouter.post("/register", async (req, res) => {
	const userToRegister = req.body;

	const user = new UserModel(userToRegister);
	await user.save();
	res.redirect("/");
});

sessionsRouter.post("/login", async (res, req) => {
	const { email, password } = req.body;

	const user = await UserModel.findOne({ email, password }).lean().exec();

	if (!user) {
		return res.redirect("/");
	}

	if (
		user.email === "adminCoder@coder.com" &&
		user.password === "adminCod3r123"
	) {
		user.role = "admin";
	} else {
		user.role = "user";
	}

	req.session.user = user;

	res.redirect("/products");
});

sessionsRouter.get("/logout", (req, res) => {
	req.session.destroy((error) => {
		if (error) {
			console.log(error);
			res.status(500).render("error", { error: error });
		} else res.redirect("/");
	});
});

export default sessionsRouter;
