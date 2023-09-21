import { Router } from "express";

const router = Router();

const Pokemon = [
	{ name: "charmander", type: "fire" },
	{ name: "squirtle", type: "water" },
	{
		name: "bulbasour",
		type: "grass",
	},
];

router.get("/", (req, res) => {
	res.render("list", { Pokemon });
});

router.get("/:name", (req, res) => {
	const name = req.params.name;
	res.send(`listing the name of ${name}`);
});

router.post("/", (req, res) => {
	res.send("creating a pokemon");
});

export default router;
