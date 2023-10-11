import { Router } from "express";
import UserModel from "../dao/models/users.model.js";
import { createHash, isValidPassword } from "../utils.js";

const sessionsRouter = Router();

sessionsRouter.post("/register", async (req, res) => {
	let { first_name, last_name, email, age, password } = req.body;

	// Check if all required fields are present and not empty
	if (!first_name || !last_name || !email || !age || !password) {
		return res.status(400).json({ error: "All fields are required." });
	}
	// hashpassword
	password = createHash(password);

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
	const { email, password } = req.body;

	const user = await UserModel.findOne({ email }).lean().exec();

	if (!user) {
		return res.status(401).render("error", { error: "user not found" });
	}

	if (!isValidPassword(user, password)) {
		return res.status(401).render("error", { error: "Invalid password" });
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
