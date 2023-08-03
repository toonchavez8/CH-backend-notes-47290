import chalk from "chalk";
import crypto from "crypto";

console.log(chalk.yellow("Starting..."));

const BD = []; // Create an empty array to store user data (BD stands for "user database").

class UserManager {
	getUsers = () => BD; // Define a method to get the list of users from the user database array (BD).

	insertUser = (user) => {
		// Method to insert a new user into the user database array (BD).

		// Generate a random 128-byte salt and convert it to a base64 string.
		const salt = crypto.randomBytes(128).toString("base64");

		// Hash the user's password using SHA-256 algorithm and the generated salt.
		user.password = crypto
			.createHmac("sha256", salt)
			.update(user.password)
			.digest("base64");

		// Print a success message after the user is inserted.
		console.log(chalk.greenBright("User inserted successfully!"));

		// Add the user to the user database array (BD).
		BD.push(user);
	};
}

const manager = new UserManager(); // Create an instance of the UserManager class.

// Insert a new user into the user database using the insertUser method of the UserManager class.
manager.insertUser({
	name: "Miguel",
	lastName: "Chavez",
	age: 30,
	password: "1234",
});

console.log(manager.getUsers()); // Display the current list of users in the user database.
