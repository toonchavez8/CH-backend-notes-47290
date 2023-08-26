import chalk from "chalk";

// 01 import express from express
import express from "express";

const users = [
	{
		id: 1,
		name: "John",
		last: "snow",
		age: 30,
	},
	{
		id: 2,
		name: "Jane",
		last: "Doe",
		age: 25,
	},
];
// 02 declare express app
const app = express();

// 04 create server routes
app.get("/", (req, res) => {
	res.send("Hello World!");
});
app.get("/users", (req, res) => {
	res.json(users);
});

app.get("/users/:id", (req, res) => {
	// get id from url params
	const id = parseInt(req.params.id);
	// find user by id
	const user = users.find((user) => user.id === id);
	// if no user found, respond with 404
	if (!user) return res.status(404).send("User not found");
	// else return user
	res.json(user);
});

// 03 define port and start server
app.listen(3000, () => {
	console.log(chalk.blue("Server started on port 3000"));
});
