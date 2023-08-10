import express from "express";
import chalk from "chalk";

const app = express();

app.use(express.json()); // Add this line to parse JSON data in requests

const users = [
	{ id: 1, name: "John", lastName: "chavez", age: "45" },
	{ id: 2, name: "Jane", lastName: "chavez", age: "45" },
	{ id: 3, name: "Jim", lastName: "chavez", age: "45" },
];

app.get("/users/:id", (req, res) => {
	const result = users.find((user) => user.id === parseInt(req.params.id));
	if (result) {
		res.json({ status: "success", payload: result });
	} else {
		res.status(404).send("User not found");
	}
});

app.get("/users", (req, res) => {
	res.json({ status: "success", payload: users });
});

app.post("/users", (req, res) => {
	const id = users.length === 0 ? 1 : users[users.length - 1].id + 1;
	const user = {
		id,
		...req.body,
	};

	users.push(user); // Add the new user to the array
	res.status(201).json({ status: "success", payload: user });
});

app.put("/users/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const indexUser = users.findIndex((user) => user.id === id);

	if (indexUser === -1) {
		return res.status(404).send("User not found");
	}

	const updatedUser = {
		...users[indexUser],
		...req.body,
	};

	users[indexUser] = updatedUser;

	res.json({ status: "success", payload: updatedUser });
});

app.delete("/users/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const indexUser = users.findIndex((user) => user.id === id);

	if (indexUser === -1) {
		return res.status(404).send("User not found");
	}

	const deletedUser = users.splice(indexUser, 1)[0];

	res.json({ status: "success", payload: deletedUser });
});

app.listen(3000, () => {
	console.log(chalk.green("Server running on port 3000"));
});
