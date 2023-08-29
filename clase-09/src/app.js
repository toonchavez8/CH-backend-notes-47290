import express from "express";
import chalk from "chalk";
import handlebars from "express-handlebars";

const app = express();

const port = process.env.PORT || 3000;

// set up handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", "../src/views");
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
	res.render("home", { user: "miguel" });
});

app.listen(port, () => {
	console.log(chalk.green(`Sever up and running on ${port}!`));
});
