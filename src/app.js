import chalk from "chalk";
import express from "express";
import productRouter from "./routers/product.router.js";
import cartRouter from "./routers/cart.router.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
	res.json("home page");
});

app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

app.listen(3000, () => {
	console.log(chalk.green("server up"));
});
