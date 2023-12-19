import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import passport from "passport";
import config from "./config/config.js";
import crypto from "crypto";

export const JWT_SECRET = config.JWT.SECRET;
export const JWT_COOKIE_NAME = config.JWT.COOKIE_NAME;

// Helper function to create a hash from a password
export const createHash = (password) => {
	const salt = bcrypt.genSaltSync(10);
	return bcrypt.hashSync(password, salt);
};
export const comparePassword = (newPassword, oldHashedPassword) => {
	return bcrypt.compareSync(newPassword, oldHashedPassword);
};
// Helper function to verify a password against a hash
export const isValidPassword = (user, password) =>
	bcrypt.compareSync(password, user.password);

export const generateToken = (user) => {
	const token = JWT.sign({ user }, JWT_SECRET, {
		expiresIn: config.JWT.EXPIRES_IN,
	});
	return token;
};

export const extractCookies = (req) => req?.cookies?.[JWT_COOKIE_NAME] ?? null;

export const passportCall = (strategy) => {
	return (req, res, next) => {
		passport.authenticate(strategy, function (err, user, info) {
			if (err) {
				return next(err);
			}
			if (!user) {
				const errorMessage = info.message || "Authentication failed";
				return res.render("error", {
					error: errorMessage,
				});
			} else {
				req.user = user;
				next();
			}
		})(req, res, next);
	};
};

export const generatePasswordResetToken = () => {
	const token = crypto.randomBytes(16).toString("hex");

	return token;
};
