export const isAdminCheck = (req, res, next) => {
	const { email, password } = req.body;
	if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
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
	if (!req.user.user || !req.user.user == "undefined")
		return res.render("error", { Error: "You are not logged in" });
	if (policies.includes(req.user.user.role.toUpperCase())) return next();
	return res.render("error", { error: "You are not authorized" });
};
