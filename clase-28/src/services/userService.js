// This class represents a service for managing users, using a UsersDaoArray as the data access layer.

import UsersDaoArray from "../dao/usersDao.js";

export default class UsersService {
	constructor() {
		// Initialize the UsersDaoArray to interact with user data.
		this.usersDao = new UsersDaoArray();
	}

	// Retrieve all users from the data access layer (DAO).
	getAllUsers = async () => {
		return await this.usersDao.getAllUsers();
	};

	// Add a new user to the data access layer (DAO) and return the saved user.
	addUser = async (user) => {
		return await this.usersDao.save(user);
	};
}
