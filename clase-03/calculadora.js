import chalk from "chalk";

const add = (num1, num2) => {
	return new Promise((resolve, reject) => {
		const result = num1 + num2;
		if (!isNaN(result)) {
			resolve(result);
		} else {
			reject("Invalid input. Please provide valid numbers.");
		}
	});
};

const subtract = (num1, num2) => {
	return new Promise((resolve, reject) => {
		const result = num1 - num2;
		if (!isNaN(result)) {
			resolve(result);
		} else {
			reject("Invalid input. Please provide valid numbers.");
		}
	});
};

const multiply = (num1, num2) => {
	return new Promise((resolve, reject) => {
		const result = num1 * num2;
		if (!isNaN(result)) {
			resolve(result);
		} else {
			reject("Invalid input. Please provide valid numbers.");
		}
	});
};

const divide = (num1, num2) => {
	return new Promise((resolve, reject) => {
		if (num2 === 0) {
			reject("Division by zero is not allowed.");
		} else {
			const result = num1 / num2;
			if (!isNaN(result)) {
				resolve(result);
			} else {
				reject("Invalid input. Please provide valid numbers.");
			}
		}
	});
};

async function calculator() {
	try {
		console.log(chalk.green(await add(5, 5)));
		console.log(chalk.green(await subtract(5, 5)));
		console.log(chalk.green(await multiply(5, 5)));
		console.log(chalk.green(await divide(5, 5)));
	} catch (error) {
		console.log(chalk.redBright(error));
	}
}

calculator();
