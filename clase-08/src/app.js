import chalk from "chalk";
import express from "express";
import productrouter from "./router/products.router.js";

const app = express();

//allow expres to read json
app.use(express.json());

//send html via routes
app.use(express.static("./clase-08/public"));

app.use("/products", productrouter);

app.listen(3000, () => {
	console.log(chalk.green("server up"));
});
