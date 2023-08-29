import chalk from "chalk";
import express from "express";
import petsRouter from "./router/pets.router.js";
import productrouter from "./router/products.router.js";

const app = express();

//allow expres to read json
app.use(express.json());

//use encoder
app.use(express.urlencoded({ extended: true }));

//send html via routes
app.use(express.static("./clase-08/public"));

app.use("/products", productrouter);
app.use("/pets", petsRouter);

app.listen(3000, () => {
	console.log(chalk.green("server up"));
});
