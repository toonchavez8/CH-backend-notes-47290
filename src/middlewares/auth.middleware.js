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

export const handlePolicies = (policies) => (req, res, next) => {
	if (policies.includes("PUBLIC")) return next();
	if (!req.user.user) return res.redirect("/");
	if (policies.length > 0) {
		if (!policies.includes(req.user.user.role.toUppercase())) {
			return res
				.status(401)
				.json({
					status: "unauthorized",
					error: "you are not authorized to perform this action",
				});
		}
	}
};
