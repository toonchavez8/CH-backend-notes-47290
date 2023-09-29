import { Router } from "express";

const pokemons = [
	{ name: "pikachu", type: "electric" },
	{ name: "charizard", type: "fire" },
	{ name: "squirtle", type: "water" },
	{ name: "bulbasaur", type: "grass" },
	{ name: "mewtwo", type: "psychic" },
	{ name: "mew", type: "psychic" },
	{ name: "snorlax", type: "normal" },
];

const router = Router();

router.get("/", (req, res) => {
	res.render("list", { tittle: "Pokemon List", pokemons });
});

router.get("/:name", (req, res) => {
	res.send(`showing pokemon ${req.params.name}`);
});
router.post("/", (req, res) => {
	res.send("creating pokemon");
});

export default router;
