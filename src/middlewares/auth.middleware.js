export const privateRoutes = (req, res, next) => {
	console.log("req from private routes", req.user);
	if (req.user.user) return res.redirect("/profile");
	next();
};

export const publicRoutes = (req, res, next) => {
	if (!req.user.user) {
		console.log("User is not logged in");
		return res.redirect("/");
	}
	next();
};

export const isAdminCheck = (req, res, next) => {
	console.log("req from is admin", req.body);
	const { email, password } = req.body;
	if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
		console.log("Admin logged in");
		req.session.user = {
			email,
			password,
			role: "admin",
		};
		return res.redirect("/products");
	}
	next();
};
