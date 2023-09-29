import { Router } from "express";
import pokemonModel from "../models/pokemon.model.js";

const router = Router();

router.get("/", async (req, res) => {
	const pokemons = await pokemonModel.find();
	res.render("list", { tittle: "Pokemon List", pokemons });
});

router.get("/:name", (req, res) => {
	res.send(`showing pokemon ${req.params.name}`);
});
router.post("/", (req, res) => {
	res.send("creating pokemon");
});

export default router;
