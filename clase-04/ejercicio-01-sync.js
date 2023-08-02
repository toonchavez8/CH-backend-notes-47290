import chalk from "chalk";
import fs from "fs";

fs.writeFileSync("./hello.txt", "Hello World!");
fs.writeFileSync("./hello.txt", "fuck this");

console.log("File written successfully!");

if (fs.existsSync("./hello.txt")) {
	let content = fs.readFileSync("./hello.txt", "utf8");
	console.log(chalk.green(content));

	fs.appendFileSync("./hello.txt", "\nHello Again!");

	content = fs.readFileSync("./hello.txt", "utf8");
	console.log(chalk.green(content));

	fs.unlinkSync("./hello.txt");
}
