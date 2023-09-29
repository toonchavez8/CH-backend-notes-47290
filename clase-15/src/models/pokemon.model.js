import mongoose from "mongoose";

const pokemonCollection = "pokemons";

const pokemonSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	type: [String],
	photo: String,
});

const pokemonModel = mongoose.model(pokemonCollection, pokemonSchema);

export default pokemonModel;
