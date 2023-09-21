import chalk from "chalk";
import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import pokemonRouter from "./routers/pokemon.router.js";

const app = express();

app.engine("handlebars", handlebars.engine());
app.set("views", "./clase-15/src/views");
app.set("view engine", "handlebars");
app.set(express.static("/public"));

const port = 3000;

app.get("/", (req, res) => res.json({ status: "ok" }));

app.use("/api/pokemon", pokemonRouter);

app.listen(port, () => {
	console.log(chalk.green(`Server up and running on ${port}!`));
});
