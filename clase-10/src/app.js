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

// Aqui en cuanto detecto conection mando 2 eventos y si detecto desconnection mando alerta en la consola
socketServer.on("connection", (socketClient) => {
	console.log(chalk.yellow(`Client ${socketClient.id} connected `));

	// Aqui en cuanto se connecta un cliente emitimos de entrada todo el log en un evento llamado history
	socketClient.emit("history", log);

	// y luego cuando el server detecta que se envio un mensaje va crear un nuevo evento llamado mensaje y emitirlo con datos

	socketClient.on("message", (data) => {
		// con este time stamp le agregamos el tiempo para fines de cuando llegaron mensajes mas adelante
		const timestamp = new Date().toISOString();

		// pusheamos cuando detectamos un mensaje el mensaje del cliente a un objeto con el usider id y el tiempo'

		log.push({ userId: socketClient.id, message: data, timestamp });

		// y ahora si ya mandamos ese mensaje a todos lados como un obj denuevo.
		socketServer.emit("message", log);
	});
	// aqui aviso que alguien se desconecto por si mas adelanto mandamos alerta de ya no esta en linea el usario
	socketClient.on("disconnect", () => {
		console.log(chalk.red(`Client ${socketClient.id} disconnected`));
	});
});
