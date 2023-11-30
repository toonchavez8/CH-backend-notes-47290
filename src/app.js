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

import passport from "passport";
import InitializePassport from "./config/passport.config.js";
import { passportCall } from "./utils.js";
import cookieParser from "cookie-parser";
import CONFIG from "./config/config.js";
import { ticketRouter } from "./routers/ticket.router.js";
import program from "./config/command.js";
import ticketViewRouter from "./routers/ticket.view.router.js";
import errorHandler from "./middlewares/error.js";
import CustomError from "./errors/CustomError.js";

const app = express();
const opts = program.opts();
export const PORT = opts.port || CONFIG.APISERVER.PORT;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));
// Add this line before defining your routes
app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");
app.use(errorHandler);
// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something went wrong!");
});

// Database configuration
const dbUrl = CONFIG.MONGO.URI;
const dbName = CONFIG.MONGO.DB;

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
				secret: process.env.SECRET,
				resave: true,
				saveUninitialized: true,
			})
		);

		InitializePassport();
		app.use(passport.initialize());
		app.use(passport.session());

		// Routes
		app.use("/", sessionsViewRouter);
		app.use("/api/products", productRouter);
		app.use("/api/cart", cartRouter);
		app.use("/api/sessions", sessionsRouter);
		app.use("/api/ticket", ticketRouter);
		// Middleware to check if the user is an admin
		app.use("/products", passportCall("jwt"), productsViewsRouter);
		app.use("/carts", cartsViewsRouter);
		app.use("/chat", chatRouter);
		app.use("/ticket", ticketViewRouter);
		// Initialize sockets
		Sockets(io);
	} catch (error) {
		CustomError.createError({
			name: "Server Error",
			message: "Server failed to start",
			cause: error.message,
			code: 500,
		});
	}
}

startServer();
