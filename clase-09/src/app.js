import express from "express";
import chalk from "chalk";
import handlebars from "express-handlebars";
import userRouter from "./routers/users.router.js";

const app = express();

const port = process.env.PORT || 3000;

// set up handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", "../src/views");
app.set("view engine", "handlebars");

app.use("/users", userRouter);

app.listen(port, () => {
	console.log(chalk.green(`Sever up and running on ${port}!`));
});
