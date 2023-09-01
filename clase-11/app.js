import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import viewRouter from "./routers/view.router.js";

const app = express();

const port = 3000;
const httpServer = app.listen(port, () => {
	console.log(`App listening on port ${port}!`);
});

const io = new Server(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", "./clase-11/views");
app.set("view engine", "handlebars");

app.use(express.static("./clase-11/public"));
app.use("/", viewRouter);

const messages = [];

io.on("connection", (socket) => {
	socket.on("message", (data) => {
		messages.push(data);
		io.emit("logs", messages);
	});
});
