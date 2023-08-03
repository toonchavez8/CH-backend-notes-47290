import chalk from "chalk";
import moment from "moment"; // Import the Moment.js library

console.log(chalk.yellow("Program started!"));

function calculateAge(dateOfBirth) {
	const currentDate = moment(); // Store the current date
	const dob = moment(dateOfBirth, "YYYY-MM-DD"); // Store the date of birth

	if (!dob.isValid()) {
		console.log("Invalid date of birth.");
		return;
	}

	const age = currentDate.diff(dob, "years"); // Calculate the age in years
	const days = currentDate.diff(dob, "days"); // Calculate the age in days
	const months = currentDate.diff(dob, "months"); // Calculate the age in months
	const seconds = currentDate.diff(dob, "seconds").toLocaleString(); // Calculate the age in seconds
	const seasons = Math.floor(months / 3);

	const christmas = moment({ month: 11, day: 25 });
	const halloween = moment({ month: 9, day: 31 });

	const christmasCount = christmas.diff(dob, "years");
	const halloweenCount = halloween.diff(dob, "years");

	// Format the age in days with commas using toLocaleString()
	const formattedAge = days.toLocaleString();

	console.log(chalk.green(`Your age is ${age} years.`));
	console.log(chalk.green(`That's about ${seconds} seconds!`));
	console.log(chalk.green(`You've been alive for ${formattedAge} days.`));
	console.log(chalk.green(`You've been alive for ${months} months!`));
	console.log(chalk.green(`You've lived through ${seasons} seasons!`));

	console.log(chalk.red(`You've seen ${christmasCount} Christmases! `));
	console.log(
		chalk.magenta(`You've celebrated ${halloweenCount} Halloweens! `)
	);

	// Calculate the number of leap years between DOB and current date
	let leapYears = 0;
	for (let year = dob.year(); year <= currentDate.year(); year++) {
		if (moment({ year }).isLeapYear()) {
			leapYears++;
		}
	}

	console.log(
		chalk.greenBright(`You've lived through ${leapYears} leap years! `)
	);
}

// Usage example:
const dateOfBirth = "1990-10-20"; // Replace with your actual date of birth
calculateAge(dateOfBirth);
