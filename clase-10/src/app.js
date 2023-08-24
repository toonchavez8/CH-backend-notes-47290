import express from "express";
import { Server } from "socket.io";
import chalk from "chalk";

const app = express();

app.use(express.static("./clase-10/public"));

const port = 3000;

const httpServer = app.listen(port, () => {
	console.log(chalk.green(`Server running on port ${port}`));
});

const socketServer = new Server(httpServer);

let log = [];

socketServer.on("connection", (socketClient) => {
	console.log(chalk.yellow(`Client ${socketClient.id} connected `));

	// Send chat history to the newly connected client
	socketClient.emit("history", log);

	socketClient.on("message", (data) => {
		// Generate a timestamp for the message
		const timestamp = new Date().toISOString();

		// Push the message with timestamp into the log array
		log.push({ userId: socketClient.id, message: data, timestamp });

		// Broadcast the new message to all connected clients except the sender
		socketServer.emit("message", {
			userId: socketClient.id,
			message: data,
			timestamp,
		});
	});
	// disconect call
	socketClient.on("disconnect", () => {
		console.log(chalk.red(`Client ${socketClient.id} disconnected`));
	});
});
