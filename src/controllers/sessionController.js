import config from "../config/config.js";
import userPasswordModel from "../models/user-password.model.js";
import UserModel from "../models/users.model.js";
import { JWT_COOKIE_NAME, generatePasswordResetToken } from "../utils.js";
import nodemailer from "nodemailer";

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

	await userPasswordModel.create({
		email,
		token,
	});

	const mailerConfig = {
		service: "gmail",
		auth: { user: config.NODEMAILER.user, pass: config.NODEMAILER.pass },
	};

	let transporter = nodemailer.createTransport(mailerConfig);
	let message = {
		from: config.NODEMAILER.user,
		to: email,
		subject: "Password Reset",
		text:
			"You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
			"Please click on the following link, or paste this into your browser to complete the process:\n\n" +
			"http://localhost:3000/session/reset-password/" +
			token +
			"\n\n" +
			"If you did not request this, please ignore this email and your password will remain unchanged.\n",
	};

	try {
		await transporter.sendMail(message);
		res.json({ status: "success", message: "email sent" });
	} catch (error) {
		res.status(500).json({ status: "error", message: error.message });
	}
};

export const verfiyToken = async (req, res) => {
	try {
		const userPassword = await userPasswordModel.findOne({
			token: req.params.token,
		});

		if (!userPassword) {
			return res
				.status(404)
				.render("error", { error: "Token not found or expried" });
		}

		const user = await UserModel.findOne({ email: userPassword.email });

		if (!user) {
			return res.status(404).render("error", { error: "User not found" });
		}

		console.log(user);
		res.render("sessions/reset-password", user);
	} catch (error) {
		console.error("Error retrieving password reset token:", error);
		res.status(500).render("error", { error: "Internal Server Error" });
	}
};
export const resetPassword = async (req, res) => {
	const user = req.params.user;
	if (!user) {
		return res.status(400).render("error", { error: "user is required" });
	}
};
