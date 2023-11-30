export const generateUserErrorInfo = (user) => {
	return `
        One or more fields are missing or invalid. Please check the following:
        - first_name: Must be a string. (${user.first_name})
        - last_name: Must be a string. (${user.last_name})
        - email: Must be a string. (${user.email})
    `;
};
