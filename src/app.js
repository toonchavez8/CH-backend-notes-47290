import chalk from "chalk";
import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import { Server } from "socket.io";
import Sockets from "./sockets.js";
import { productRouter } from "./routers/product.router.js";
import cartRouter from "./routers/cart.router.js";
import productsViewsRouter from "./routers/produts-view.router.js";
import chatRouter from "./routers/chat.router.js";
import cartsViewsRouter from "./routers/chat-viewsRouter.js";

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static("./src/public"));
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

		const server = app.listen(port, () =>
			console.log(chalk.green(`Server connected to port ${port}`))
		);

		const io = new Server(server);

		// Attach socket.io to request object
		app.use((req, res, next) => {
			req.io = io;
			next();
		});

		// Routes
		app.get("/", (req, res) => {
			res.render("index");
		});
		app.use("/api/products", productRouter);
		app.use("/api/cart", cartRouter);
		app.use("/products", productsViewsRouter);
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
