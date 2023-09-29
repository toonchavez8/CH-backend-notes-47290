import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import pokemonRouter from "./routers/pokemon.router.js";
import viewsRouter from "./routers/views.router.js";
import chalk from "chalk";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", "./clase-15/src/views");
app.set("view engine", "handlebars");
app.use(express.static("./clase-15/public"));

app.get("/", (req, res) => res.json({ status: "OK" }));

app.use("/api/pokemon", pokemonRouter);
app.use("/pokemon", viewsRouter);

try {
	await mongoose.connect(
		"mongodb+srv://toonchavez8:Iac3b3br.@cluster0.aotpgnu.mongodb.net/",
		{
			dbName: "pokedex",
		}
	);
	app.listen(3000, () => {
		console.log("Server is running on port 3000");
	});
} catch (error) {
	console.log(chalk.red(error.message));
	throw error;
}
