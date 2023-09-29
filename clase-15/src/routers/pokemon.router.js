import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
	res.send("showing pokemon");
});

router.get("/:name", (req, res) => {
	res.send(`showing pokemon ${req.params.name}`);
});
router.post("/", (req, res) => {
	res.send("creating pokemon");
});

export default router;
