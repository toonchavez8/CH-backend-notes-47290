import { Router } from "express";
import multer from "multer";

const router = Router();
const pets = [];

//middle ware

const petsActive = true;

const allowNewPets = (req, res, next) => {
	if (!petsActive)
		return res.status(500).json({
			status: "error",
			error: "its not time to add pets",
		});
	next();
};

// multer set up middleware
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./clase-08/public");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const uploader = multer({ storage });

router.get("/", (req, res) => res.json({ pets }));
router.post("/", uploader.single("file"), (req, res) => {
	if (!req.file)
		return res.status(400).json({ status: "error", error: "no file added" });
	const pet = req.body;
	pet.id = pets.length === 0 ? 1 : pets[pets.length - 1].id + 1;
	pets.push(pet);
	res.json(pet);
});

export default router;
