import { Router } from "express";

const router = Router();

const fruits = [
	{ name: "Apple", price: "$0.75", emoji: "🍎" },
	{ name: "Banana", price: "$0.25", emoji: "🍌" },
	{ name: "Orange", price: "$0.60", emoji: "🍊" },
	{ name: "Grapes", price: "$1.20", emoji: "🍇" },
	{ name: "Strawberry", price: "$0.90", emoji: "🍓" },
	{ name: "Mango", price: "$1.50", emoji: "🥭" },
	{ name: "Pineapple", price: "$1.80", emoji: "🍍" },
	{ name: "Watermelon", price: "$2.00", emoji: "🍉" },
	{ name: "Cherry", price: "$1.10", emoji: "🍒" },
	{ name: "Kiwi", price: "$0.95", emoji: "🥝" },
];

const user = {
	name: "miguel",
	role: "admin",
};

router.get("/", (req, res) => {
	res.render("foods", {
		user: user.name,
		isAdmin: user.role === "admin",
		fruits,
	});
});

export default router;
