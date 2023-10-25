import chalk from "chalk";
import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import { Server } from "socket.io";
import Sockets from "./sockets.js";
import { productRouter } from "./routers/product.router.js";
import { cartRouter } from "./routers/cart.router.js";
import productsViewsRouter from "./routers/produts-view.router.js";
import chatRouter from "./routers/chat.router.js";
import cartsViewsRouter from "./routers/cart-viewsRouter.js";
import sessionsRouter from "./routers/sessions.router.js";
import sessionsViewRouter from "./routers/sessions-view.js";
import session from "express-session";
import MongoStore from "connect-mongo";

import passport from "passport";
import InitializePassport from "./config/passport.config.js";
import { passportCall } from "./utils.js";
import cookieParser from "cookie-parser";
import { isAdminCheck } from "./middlewares/auth.middleware.js";

const app = express();
export const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));
app.use(cookieParser());
// Add this line before defining your routes
app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something went wrong!");
});

// Database configuration
const dbUrl =
	"mongodb+srv://toonchavez8:Iac3b3br.@cluster0.aotpgnu.mongodb.net/";
const dbName = "ecommerce";

async function startServer() {
	try {
		await mongoose.connect(dbUrl, { dbName, useUnifiedTopology: true });

		const server = app.listen(PORT, () =>
			console.log(chalk.green(`Server connected to PORT ${PORT}`))
		);

		const io = new Server(server);

		// Attach socket.io to request object
		app.use((req, res, next) => {
			req.io = io;
			next();
		});

		app.use(
			session({
				store: MongoStore.create({ mongoUrl: dbUrl, dbName: "sessions" }),
				secret: "secret",
				resave: true,
				saveUninitialized: true,
			})
		);

		InitializePassport();
		app.use(passport.initialize());
		app.use(passport.session());

		// Routes
		app.use("/api/sessions", sessionsRouter);
		app.use("/", sessionsViewRouter);
		app.use("/api/products", productRouter);
		app.use("/api/cart", cartRouter);
		// Middleware to check if the user is an admin
		app.use(isAdminCheck);
		app.use(
			"/products",
			passportCall("jwt"),

			productsViewsRouter
		);
		app.use("/carts", cartsViewsRouter);
		app.use("/chat", chatRouter);
		// Initialize sockets
		Sockets(io);
	} catch (error) {
		console.log(chalk.red(error.message));
		throw error;
	}
}

startServer();
