import chalk from "chalk";
import express from "express";
import productRouter from "./routers/product.router.js";
import cartRouter from "./routers/cart.router.js";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import viewsRouter from "./routers/view.router.js";
import mongoose from "mongoose";

const app = express();

// Middleware
app.use(express.json());
app.use(express.static("./src/public"));
app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

// Routes
app.get("/", (req, res) => {
	res.render("index");
});
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/products", viewsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something went wrong!");
});

const port = 3000;

try {
	await mongoose.connect(
		"mongodb+srv://toonchavez8:Iac3b3br.@cluster0.aotpgnu.mongodb.net/",
		{
			dbName: "ecommerce",
		}
	);

	const server = app.listen(port, () =>
		console.log(chalk.green(`Server connected to port ${port}`))
	);

	const io = new Server(server);

	io.on("connection", (socket) => {
		console.log(chalk.yellow("New client connected"));
		socket.on("productList", (data) => {
			io.emit("updatedProducts", data);
		});
	});
} catch (error) {
	console.log(chalk.red(error.message));
	throw error;
}