import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();

const storageMethod = "cookie";

// Middleware to set up storage based on the chosen method
const setupStorage = (req, res, next) => {
	if (storageMethod === "cookie") {
		cookieParser("secret")(req, res, next);
	} else if (storageMethod === "session") {
		session({
			secret: "secret",
			resave: true,
			saveUninitialized: true,
		})(req, res, next);
	} else {
		next(new Error("Invalid storage method"));
	}
};

// Use the middleware for all routes
app.use(setupStorage);

app.get("/", (req, res) => {
	const user = {
		name: "miguel",
		age: 25,
		gender: "Male",
		role: "admin",
	};

	if (storageMethod === "cookie") {
		res.cookie("user", user, { signed: true }).send("Hello World!");
	}

	if (storageMethod === "session") {
		req.session.user = user;

		console.log(req.session);
		res.send("Hello World!");
	}
});

app.get("/user", (req, res) => {
	console.log(storageMethod);

	if (req[storageMethod].user?.role === "admin") {
		const user = req[storageMethod].user;
		res.send(user);
	} else {
		res.send("No user found");
	}
});

app.get("/logout", (req, res) => {
	req.storageMethod.destroy(() => {
		res.send("Logged out");
	});
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
