import { userService } from "../services/servicesSwitch.js";

const getUsers = async (req, res) => {
	let results = await userService.getUsers();
	res.send(results);
};

const saveUser = async (req, res) => {
	let { first_name, last_name, email } = req.body;
	if (!first_name || !last_name || !email) {
		res.status(400).send("Missing required fields");
		return;
	}

	let result = await userService.saveUser({ first_name, last_name, email });

	res.send(result);
};

export default { getUsers, saveUser };
