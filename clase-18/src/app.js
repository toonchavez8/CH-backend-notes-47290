import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser("secret"));

app.get("/", (req, res) => {
	const user = {
		name: "miguel",
		age: 25,
		gender: "Male",
		role: "admin",
	};
	res.cookie("user", user, { signed: true }).send("Hello World!");
});

app.get("/user", (req, res) => {
	if (req.signedCookies.user?.role === "admin") {
		const user = req.signedCookies.user;
		res.send(user);
	} else {
		res.send("No user found");
	}
});

app.get("/logout", (req, res) => {
	res.clearCookie("user").send("Logged out");
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
