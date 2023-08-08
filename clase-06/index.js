import chalk from "chalk";
import http from "http";

// Create an HTTP server using the http.createServer() method
const server = http.createServer((req, res) => {
	// This function is a request listener that handles incoming HTTP requests

	// Log a message to the console when a request is received
	console.log("Request received");

	// Send an HTTP response with a status code of 200 (OK) and a message "hello world"
	res.end("hello world");
});

// Define the port number on which the server will listen
const port = 3000;

// Start the server and listen on the specified port
server.listen(port, () => {
	// This callback function is executed when the server starts listening

	// Log a colored message to the console using chalk indicating that the server is running
	console.log(chalk.green(`Server running on port ${port}`));
});
