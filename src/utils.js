import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import passport from "passport";

export const JWT_SECRET = "secret";
export const JWT_COOKIE_NAME = "mycookie";

// Helper function to create a hash from a password
export const createHash = (password) => {
	const salt = bcrypt.genSaltSync(10);
	return bcrypt.hashSync(password, salt);
};

// Helper function to verify a password against a hash
export const isValidPassword = (user, password) =>
	bcrypt.compareSync(password, user.password);

export const generateToken = (user) => {
	const token = JWT.sign({ user }, JWT_SECRET, { expiresIn: "24h" });
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

export const handlePolicies = (policies) => (req, res, next) => {
	const user = req.user || null;
	if (!policies.includes(user.role)) {
		return res.status(401).render("error", { error: "Unauthorized" });
	}
	return next();
};
