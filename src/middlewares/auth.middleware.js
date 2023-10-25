export const privateRoutes = (req, res, next) => {
	if (req.session.user) return res.redirect("/profile");
	next();
};

export const publicRoutes = (req, res, next) => {
	if (!req.session.user) return res.redirect("/");
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
