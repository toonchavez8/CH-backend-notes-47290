import { JWT_COOKIE_NAME } from "../utils.js";

export const register = async (req, res) => {
	res.redirect("/session/login");
};

export const login = async (req, res) => {
	if (!req.user) {
		return res.status(401).render("error", { error: "passport login failed" });
	}
	res.cookie(JWT_COOKIE_NAME, req.user.token).redirect("/products");
};

export const logout = (req, res) => {
	res.clearCookie(JWT_COOKIE_NAME).redirect("/session/login");
};
