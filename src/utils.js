import bcrypt from "bcrypt";

// Helper function to create a hash from a password
export const createHash = (password) => {
	const salt = bcrypt.genSaltSync(10);
	return bcrypt.hashSync(password, salt);
};

// Helper function to verify a password against a hash
export const isValidPassword = (password, hash) =>
	bcrypt.compareSync(password, hash);

export default {
	createHash,
	isValidPassword,
};
