import chalk from "chalk";

// 01 import express from express
import express from "express";

// 02 declare express app
const app = express();

// 04 create server routes
app.get("/", (req, res) => {
	res.send("Hello World!");
});
app.get("/users", (req, res) => {
	res.send("User List");
});

// 03 define port and start server
app.listen(3000, () => {
	console.log(chalk.blue("Server started on port 3000"));
});
