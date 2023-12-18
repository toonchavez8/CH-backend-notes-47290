import UserModel from "./models/user.model.js";

export default class UserDAO {
	get = async () => await UserModel.find();
	getById = async (id) => await UserModel.findById(id);
	Update = async (id, user) =>
		await UserModel.findByIdAndUpdate(id, user, { new: true });
	create = async (user) => await UserModel.create(user);
	delete = async (id) => await UserModel.findByIdAndDelete(id);
}
