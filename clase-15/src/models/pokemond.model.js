import mongoose from "mongoose";

const pokemonCollection = "pokemons";

const pokemonSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true,
		trim: true,
	},
	type: [
		{
			type: String,
			required: true,
			trim: true,
		},
	],
	sprite: {
		type: String,
		required: true,
		trim: true,
	},
	caught: {
		type: Boolean,
		default: false,
	},
});

const pokemonModel = mongoose.model(pokemonCollection, pokemonSchema);

export default pokemonModel;
