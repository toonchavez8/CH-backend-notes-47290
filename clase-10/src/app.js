import express from "express";
import { Server } from "socket.io";
import chalk from "chalk";

const app = express();

app.use(express.static("./clase-10/public"));

const port = 3000;

const httpServer = app.listen(port, () => {
	console.log(chalk.green(`server running on port ${port}`));
});

const socketServer = new Server(httpServer);

let log = [];

socketServer.on("connection", (socketClient) => {
	console.log(chalk.yellow(`client ${socketClient.id} connected `));
	socketClient.on("message", (data) => {
		log.push({ userId: socketClient.id, message: data });
		socketClient.emit("history", log);
	});
});
