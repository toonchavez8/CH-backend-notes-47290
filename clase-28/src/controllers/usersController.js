// This module defines controllers for handling user-related HTTP requests.

import UsersService from "../services/userService.js";
import UserDTO from "../dto/usersDTO.js";

// Create an instance of the UsersService to interact with user data.
const usersService = new UsersService();

// Controller function to handle the request for retrieving all users.
const getAllUsers = async (req, res) => {
	// Call the getAllUsers method from UsersService to fetch all users.
	let users = await usersService.getAllUsers();

	// Convert the users array to an array of UserDTO objects.
	let usersDTO = users.map((user) => new UserDTO(user));

	// Respond with the fetched users in the HTTP response.
	res.status(200).send(usersDTO);
};

// Controller function to handle the request for saving a new user.
const saveUser = async (req, res) => {
	// Extract user data from the request body.
	let user = req.body;

	// Call the addUser method from UsersService to save the new user.
	const savedUser = await usersService.addUser(user);

	// Respond with the saved user in the HTTP response.
	res.status(201).send(new UserDTO(savedUser));
};

// Export the controller functions for use in the router.
export default { getAllUsers, saveUser };
