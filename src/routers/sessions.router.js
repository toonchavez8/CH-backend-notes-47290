import { Router } from "express";
import UserModel from "../dao/models/users.model.js";

const sessionsRouter = Router();

sessionsRouter.post("/register", async (req, res) => {
	const { first_name, last_name, email, age, password } = req.body;

	console.log("REQ BODY", req.body);
	// Check if all required fields are present and not empty
	if (!first_name || !last_name || !email || !age || !password) {
		return res.status(400).json({ error: "All fields are required." });
	}

	try {
		// Create a new user document and save it to MongoDB
		const newUser = new UserModel({
			first_name,
			last_name,
			email,
			age,
			password,
		});

		await newUser.save();

		console.log("User created successfully!");
		// Send a success response with a message
		res.redirect("/");
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Error saving user." });
	}
});

sessionsRouter.post("/login", async (req, res) => {
	console.log("REQ BODY", req.body);
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
