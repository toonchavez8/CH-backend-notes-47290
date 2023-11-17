export default class UserDTO {
	constructor(user) {
		this.first_name = user.first_name;
		this.email = user.email;
		this.role = user.role;
	}

	toJSON() {
		return {
			first_name: this.first_name,
			email: this.email,
			role: this.role,
		};
	}
}
