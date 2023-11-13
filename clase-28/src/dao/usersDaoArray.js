// This class represents a Data Access Object (DAO) for managing users stored in an array.

export default class UsersDaoArray {
	constructor() {
		// Initialize an empty array to store users.
		this.users = [];
	}

	// Method to Get all users from the array.
	getAllUsers = async () => {
		return this.users;
	};

	// Method to Save a user to the array.
	save = async (user) => {
		// Check if the array is not empty to set the user's id.
		if (this.users.length > 0)
			user.id = this.users[this.users.length - 1].id + 1;
		else user.id = 1;

		// Add the user to the array and return the saved user.
		this.users.push(user);
		return user;
	};
}
