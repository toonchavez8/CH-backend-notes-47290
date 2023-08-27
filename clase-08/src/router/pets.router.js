import { Router } from "express";

const router = Router();
const pets = [];

router.get("/", (req, res) => res.json({ pets }));
router.post("/", (req, res) => {
	const pet = req.body;
	pet.id = pets.length === 0 ? 1 : pets[pets.length - 1].id + 1;
	pets.push(pet);
	res.json(pet);
});

export default router;
