export default class UserDTO {
	constructor(user) {
		this.name = `${user.first_name} ${user.last_name}`;
		this.email = user.email;
	}

	toJSON() {
		return {
			name: this.name,
			email: this.email,
		};
	}
}
