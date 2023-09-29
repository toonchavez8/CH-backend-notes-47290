import { Router } from "express";
import pokemonModel from "../models/pokemon.model.js";

const router = Router();

router.get("/", async (req, res) => {
	// when i view we need to add lean and exec to find into readable by handlebars
	const pokemons = await pokemonModel.find().lean().exec();
	res.render("list", { tittle: "Pokemon List", pokemons });
});

router.get("/create", (req, res) => {
	res.render("create", { tittle: "create a pokemon" });
});

export default router;
