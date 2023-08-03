import chalk from "chalk";

console.log(chalk.yellow("Loading..."));

// create a function that returnes 10 random numbers from 1-20
function getRandomNumbers() {
	const obj = {};
	for (let index = 0; index < 1000; index++) {
		const aleatoreo = parseInt(Math.random() * 20 + 1);
		if (!obj[aleatoreo]) obj[aleatoreo] = 1;
		else obj[aleatoreo]++;
	}

	return obj;
}
const numbers = getRandomNumbers();

console.log(chalk.yellow("Random numbers generated!"));

console.log(numbers);
