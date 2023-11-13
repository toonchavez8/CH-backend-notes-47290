// This class represents a service for managing users, using a UsersDaoArray as the data access layer.

import PersistenceFactory from "../dao/persistanceFactory.js";
export default class UsersService {
	constructor() {
		// Initialize the UsersDaoArray to interact with user data.
		this.usersDao;
		this.init();
	}

	init = async () => {
		// Initialize the UsersDaoArray to interact with user data.
		this.usersDao = await PersistenceFactory.getPersistance();
	};

	// Retrieve all users from the data access layer (DAO).
	getAllUsers = async () => {
		return await this.usersDao.getAllUsers();
	};

	// Add a new user to the data access layer (DAO) and return the saved user.
	addUser = async (user) => {
		return await this.usersDao.save(user);
	};
}
