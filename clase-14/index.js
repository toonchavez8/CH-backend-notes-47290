import chalk from "chalk";
import mongoose from "mongoose";
import config from "./config.js";

// we create a function that will create the connection to the db using a config file
async function connectToDatabase() {
	try {
		await mongoose.connect(config.mongoURI, {
			dbName: "personajesGOT",
		});
		console.log(chalk.green("db Connected"));
	} catch (error) {
		console.log(chalk.red(error.message));
		throw error;
	}
}

// then we pop db after connecting with mock data
async function populateDatabase() {
	let errorOccured = false;
	try {
		await connectToDatabase();

		const personajesGOT = [
			{ nombre: "Jon Snow", edad: 30, nota: 9 },
			{ nombre: "Daenerys Targaryen", edad: 25, nota: 8 },
			{ nombre: "Tyrion Lannister", edad: 40, nota: 9 },
			{ nombre: "Arya Stark", edad: 20, nota: 8 },
			{ nombre: "Sansa Stark", edad: 25, nota: 8 },
			{ nombre: "Cersei Lannister", edad: 45, nota: 7 },
			{ nombre: "Jaime Lannister", edad: 40, nota: 8 },
			{ nombre: "Bran Stark", edad: 22, nota: 9 },
			{ nombre: "Margaery Tyrell", edad: 28, nota: 9 },
			{ nombre: "Robb Stark", edad: 30, nota: 8 },
		];

		const personajesGOTSchema = new mongoose.Schema({
			nombre: String,
			edad: Number,
			nota: Number,
		});

		const personajesGOTDAO = mongoose.model(
			"personajesGOT",
			personajesGOTSchema
		);

		// Use a insertMany to create documents
		await personajesGOTDAO.insertMany(personajesGOT);
	} catch (error) {
		console.log(chalk.red(error.message));
		errorOccured = true;
	} finally {
		if (errorOccured) {
			console.log(chalk.yellow("Error occurred during await request."));
		} else {
			console.log(chalk.green("await request successful"));
		}
	}
}

populateDatabase();
