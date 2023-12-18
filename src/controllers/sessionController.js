import UserDTO from "../dto/user.DTO.js";
import UserModel from "../models/users.model.js";
import { JWT_COOKIE_NAME, generatePasswordResetToken } from "../utils.js";

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

export const forgotPassword = async (req, res) => {
	const email = req.body.email;
	if (!email) {
		return res.status(400).render("error", { error: "email is required" });
	}

	const user = await UserModel.findOne({ email });
	if (!user) {
		return res.status(404).render("error", { error: "user not found" });
	}

	const token = generatePasswordResetToken();

	res.json({ token });
};

export const verfiyToken = async (req, res) => {
	const token = req.params.token;
	if (!token) {
		return res.status(400).render("error", { error: "token is required" });
	}
};
export const resetPassword = async (req, res) => {
	const user = req.params.user;
	if (!user) {
		return res.status(400).render("error", { error: "user is required" });
	}
};
