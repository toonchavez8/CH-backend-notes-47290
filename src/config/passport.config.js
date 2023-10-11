import passport from "passport";
import local from "passport-local";
import { createHash, isValidPassword } from "../utils.js";
import UserModel from "../dao/models/users.model.js";

const LocalStrategy = local.Strategy;

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

					return done(null, user);
				} catch (error) {
					console.error(error);
					return done(error);
				}
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
