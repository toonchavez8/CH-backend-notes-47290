import passport from "passport";
import local from "passport-local";
import {
	createHash,
	extractCookies,
	generateToken,
	isValidPassword,
	JWT_SECRET,
} from "../utils.js";
import UserModel from "../dao/models/users.model.js";
import GitHubStrategy from "passport-github2";
import PassPortJWT from "passport-jwt";

const LocalStrategy = local.Strategy;

const JWTStrategy = PassPortJWT.Strategy;

const InitializePassport = () => {
	passport.use(
		"register",
		new LocalStrategy(
			{
				passReqToCallback: true,
				usernameField: "email",
			},
			async (req, username, password, done) => {
				let { first_name, last_name, email, age } = req.body;

				try {
					const user = await UserModel.findOne({ email: username });

					if (user) {
						return done(null, false, { message: "User already exists" });
					}

					const newUser = {
						first_name,
						last_name,
						email,
						age,
						password: createHash(password),
					};

					const result = await UserModel.create(newUser);

					return done(null, result);
				} catch (error) {
					console.error(error);
					return done(error);
				}
			}
		)
	);

	passport.use(
		"login",
		new LocalStrategy(
			{
				usernameField: "email",
			},
			async (username, password, done) => {
				try {
					const user = await UserModel.findOne({ email: username });

					if (!user) {
						return done(null, false, { message: "User not found" });
					}

					if (!isValidPassword(user, password)) {
						return done(null, false, { message: "Invalid password" });
					}

					const token = generateToken(user);
					console.log("token", token);
					user.token = token;

					return done(null, user);
				} catch (error) {
					console.error(error);
					return done(error);
				}
			}
		)
	);

	passport.use(
		"github",
		new GitHubStrategy(
			{
				clientID: "Iv1.ec6bd7aadc18d422",
				clientSecret: "ab1eb3a0e2a445da50c4a6aaf2d43795e670a7a6",
				callbackURL: "http://localhost:3000/session/githubcallback",
				scope: ["user:email"],
			},
			async (accessToken, refreshToken, profile, done) => {
				try {
					const email = profile.emails[0].value; // Get the email from the first item in the emails array
					console.log("email", email);

					// Check if a user with this email already exists
					const existingUser = await UserModel.findOne({ email });

					if (existingUser) {
						return done(null, existingUser);
					}

					// Create a new user if no user with this email exists
					const newUser = await UserModel.create({
						first_name: profile._json.name,
						last_name: "GitHub User",
						email: email,
						password: "github-user-password",
					});

					return done(null, newUser);
				} catch (error) {
					console.error("Error logging into GitHub:", error);
					return done(error);
				}
			}
		)
	);

	passport.use(
		"jwt",
		new JWTStrategy(
			{
				secretOrKey: JWT_SECRET,
				jwtFromRequest: PassPortJWT.ExtractJwt.fromExtractors([extractCookies]),
			},
			async (jwt_payload, done) => {
				done(null, jwt_payload);
			}
		)
	);

	passport.serializeUser((user, done) => {
		done(null, user._id);
	});

	passport.deserializeUser(async (id, done) => {
		const user = await UserModel.findById(id);
		done(null, user);
	});
};

export default InitializePassport;
