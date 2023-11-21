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
	console.log("req from handle policies", req.user.user);
	if (policies.includes("PUBLIC")) return next();
	if (!req.user.user || !req.user.user == "undefined")
		return res.render("error", { Error: "You are not logged in" });
	if (policies.includes(req.user.user.role.toUpperCase())) return next();
	return res.render("error", { error: "You are not authorized" });
};
