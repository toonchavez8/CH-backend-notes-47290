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
	const token = JWT.sign(
		{
			id: user.id,
			email: user.email,
			role: user.role,
		},
		JWT_SECRET,
		{ expiresIn: "24h" }
	);
	return token;
};

export const extractCookies = (req) => req?.cookies?.[JWT_COOKIE_NAME] ?? null;

export const passportCall = (strategy) => {
	return async (req, res, next) => {
		passport.authenticate(strategy, function (err, user, info) {
			if (err) {
				return next(err);
			}
			if (!user) {
				return res.status(401).render("error", { error: info.message });
			}
			req.user = user;
			next();
		})(req, res, next);
	};
};
