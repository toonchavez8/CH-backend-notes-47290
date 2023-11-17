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
import cartModel from "../dao/models/carts.model.js";
import config from "./config.js";

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
					const existingUser = await UserModel.findOne({ email: username });

					if (existingUser) {
						return done(null, false, { message: "User already exists" });
					}

					// Create a new user
					const newUser = {
						first_name,
						last_name,
						email,
						age,
						password: createHash(password),
						role: email === config.ADMIN.EMAIL ? "admin" : "user",
					};

					// Generate a JWT token for the new user
					const token = generateToken(newUser);

					console.log("newUser", newUser);
					console.log("token", token);

					// Add the token to the user object
					newUser.token = token;

					// Create a cart for the user
					const newCart = new cartModel({ userEmail: email, products: [] });
					await newCart.save();

					console.log("newCart", newCart);

					newUser.cart = newCart._id;

					const result = await UserModel.create(newUser);

					const user = result;

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
		"login",
		new LocalStrategy(
			{
				passReqToCallback: true, // esta linea me faltaba
				usernameField: "email",
			},
			async (req, username, password, done) => {
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

					// save cartID to localsession for later use
					req.session.cartID = user.cart;

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
				clientID: config.GitHub.CLIENT_ID,
				clientSecret: config.GitHub.CLIENT_SECRET,
				callbackURL: config.GitHub.CALLBACK_URL,
				scope: ["user:email"],
				passReqToCallback: true, // Add this line
			},
			async (req, accessToken, refreshToken, profile, done) => {
				try {
					const email = profile.emails[0].value;

					const existingUser = await UserModel.findOne({ email });

					if (existingUser) {
						const token = generateToken(existingUser);
						console.log("User already exists. Generating JWT token.");

						existingUser.token = token;

						req.session.cartID = existingUser.cart;
						return done(null, existingUser);
					}

					const newCart = new cartModel({ userEmail: email, products: [] });

					const newUser = await UserModel.create({
						first_name: profile._json.name,
						last_name: "GitHub User",
						email: email,
						password: "github-user-password",
						role: "user",
						cart: newCart,
					});

					await newCart.save();
					const token = generateToken(newUser);

					newUser.token = token;

					req.session.cartID = newUser.cart;

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
