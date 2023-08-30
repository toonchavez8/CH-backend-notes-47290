import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
	res.render("home", { user: "miguel" });
});

export default router;
