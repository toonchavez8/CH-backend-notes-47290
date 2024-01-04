import config from "../config/config.js";
import userPasswordModel from "../models/user-password.model.js";
import UserModel from "../models/users.model.js";
import {
	JWT_COOKIE_NAME,
	createHash,
	generatePasswordResetToken,
	isValidPassword,
} from "../utils.js";
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
		html: `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Password Reset</title>
				<style>
					body {
						font-family: Arial, sans-serif;
						line-height: 1.6;
						color: #333;
					}
					.container {
						max-width: 600px;
						margin: 0 auto;
						padding: 20px;
						background-color: #f4f4f4;
						border-radius: 8px;
					}
					.header {
						background-color: #9333ea;
						color: #fff;
						text-align: center;
						padding: 10px;
						border-radius: 4px 4px 0 0;
					}
					.content {
						padding: 20px;
					}
					.footer {
						text-align: center;
						padding: 10px;
						background-color: #9333ea;
						color: #fff;
						border-radius: 0 0 4px 4px;
					}
				</style>
			</head>
			<body>
				<div class="container">
					<div class="header">
						<h1>Password Reset</h1>
					</div>
					<div class="content">
						<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
						<h2>Please click on the following link to complete the process:</h2>
						<p><a href="http://localhost:3000/session/reset-password/${token}">Reset Password</a></p>
						<p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
					</div>
					<div class="footer">
						<p>Thank you for using our service!</p>
					</div>
				</div>
			</body>
			</html>
		`,
	};

	try {
		await transporter.sendMail(message);
		res.status(200).json({ status: "success", message: "Email sent" });
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
			return res.status(404).render("error", {
				error: "Token not found or expired, please try again below",
				resetPassword: true,
			});
		}

		const user = await UserModel.findOne({ email: userPassword.email });

		if (!user) {
			return res.status(404).render("error", { error: "User not found" });
		}
		res.render("sessions/reset-password", user);
	} catch (error) {
		console.error("Error retrieving password reset token:", error);
		res.status(500).render("error", { error: "Internal Server Error" });
	}
};
export const resetPassword = async (req, res) => {
	try {
		const userEmail = req.body.email;
		const newPassword = req.body.password;

		const hashedPassword = createHash(newPassword);

		const user = await UserModel.findOne({ email: userEmail });

		if (!user) {
			return res
				.status(404)
				.json({ status: "error", message: "User not found" });
		}

		// Check if the new password is the same as a previous password
		const comparePasswords = isValidPassword(user, newPassword);

		if (comparePasswords) {
			return res.status(400).json({
				status: "error",
				message: "Passwords is the same as a previous password",
				resetPassword: true,
			});
		}

		// Update the user's password
		await UserModel.findByIdAndUpdate(user._id, { password: hashedPassword });

		return res.status(200).render("sessions/reset-password-success", {
			email: userEmail,
		});
	} catch (error) {
		console.error("Error resetting password:", error);
		return res
			.status(500)
			.json({ status: "error", message: "Internal Server Error" });
	}
};

export const togglePremium = async (req, res) => {
	try {
		const email = req.params.email;

		const User = await UserModel.findOne({ email });

		const userRole = User.role;
		let updatedRole;
		if (userRole === "user") {
			await UserModel.findByIdAndUpdate(User._id, {
				role: "premium",
			});
			updatedRole = "premium";
		} else if (userRole === "premium") {
			await UserModel.findByIdAndUpdate(User._id, {
				role: "user",
			});
			updatedRole = "user";
		} else {
			updatedRole = req.user.role;
			return res.json({
				status: "warning",
				message: "You are Admin you silly goose",
				userRole: updatedRole,
			});
		}
		return res.json({ status: "success", userRole: updatedRole });
	} catch (error) {
		console.error("Error toggling premium status:", error);
		res.json({ status: "error", message: error });
	}
};
