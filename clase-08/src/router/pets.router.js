import { Router } from "express";

const router = Router();
const pets = [];

//middle ware

const petsActive = false;

const allowNewPets = (req, res, next) => {
	if (!petsActive)
		return res.status(500).json({
			status: "error",
			error: "its not time to add pets",
		});
	next();
};

router.get("/", (req, res) => res.json({ pets }));
router.post("/", allowNewPets, (req, res) => {
	const pet = req.body;
	pet.id = pets.length === 0 ? 1 : pets[pets.length - 1].id + 1;
	pets.push(pet);
	res.json(pet);
});

export default router;
