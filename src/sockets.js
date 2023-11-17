import chalk from "chalk";
import messageModel from "./models/messages.model.js";

const Sockets = (io) => {
	io.on("connection", async (socket) => {
		console.log(chalk.yellow("New client connected"));
		socket.on("productList", (data) => {
			io.emit("updatedProducts", data);
		});

		let message = await messageModel.find().lean().exec();

		socket.emit("logs", message);
		socket.on("message", async (data) => {
			await messageModel.create(data);
			message = await messageModel.find().lean().exec();
			io.emit("logs", message);
		});
	});
};

export default Sockets;
