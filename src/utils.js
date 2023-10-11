import bcrypt from "bcrypt";

// Helper function to create a hash from a password
export const createHash = (password) => {
	const salt = bcrypt.genSaltSync(10);
	return bcrypt.hashSync(password, salt);
};

// Helper function to verify a password against a hash
export const isValidPassword = (user, password) =>
	bcrypt.compareSync(password, user.password);

export default {
	createHash,
	isValidPassword,
};
