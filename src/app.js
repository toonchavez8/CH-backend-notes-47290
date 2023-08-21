import chalk from "chalk";
import express from "express";
import productRouter from "./routers/product.router.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
	res.json("home page");
});

app.use("/api/products", productRouter);

app.listen(3000, () => {
	console.log(chalk.green("server up"));
});
