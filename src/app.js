import chalk from "chalk";
import express from "express";
import router from "./routers/product.router.js";

const app = express();

app.get("/", (req, res) => {
	res.json("home page");
});

app.use("/products", router);

app.listen(3000, () => {
	console.log(chalk.green("server up"));
});
