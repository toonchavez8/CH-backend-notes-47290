import { Router } from "express";
import pokemonModel from "../models/pokemon.model.js";
import chalk from "chalk";

const router = Router();

router.get("/", async (req, res) => {
	const pokemons = await pokemonModel.find().lean().exec();
	res.json(pokemons);
});

router.get("/:name", (req, res) => {
	res.send(`showing pokemon ${req.params.name}`);
});
router.post("/", async (req, res) => {
	const pokemonNew = req.body;

	const pokemonGenerated = new pokemonModel(pokemonNew);

	try {
		await pokemonGenerated.save();
	} catch (error) {
		console.log(chalk.red(error.message));
	}
	res.redirect("/pokemon");
});

export default router;
