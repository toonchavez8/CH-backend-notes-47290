import chalk from "chalk";
import express from "express";

const app = express();

// Define a regular expression pattern to match words with letters and accents
const wordPattern = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/;

app.get("/api/dictionary/:word(" + wordPattern.source + ")", (req, res) => {
	const word = req.params.word;
	res.send(`Word ${word} added to dictionary`);
});

app.get("*", (req, res) => {
	res.status(404).send("Not Found");
});

const port = 3000;

app.listen(port, () => {
	console.log(chalk.green("Server running"));
});
