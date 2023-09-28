import mongoose from "mongoose";

// We create data for our DB
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

// we tell mongoose the schema shape of our collection
const personajesGOTSchema = new mongoose.Schema({
	nombre: String,
	edad: Number,
	nota: Number,
});

// DAO = Data Access Object
// we tell mongose to create a new collection with the shape of our shema
const personajesGOTDAO = mongoose.model("personajesGOT", personajesGOTSchema);
