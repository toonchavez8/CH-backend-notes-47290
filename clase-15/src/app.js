import express from "express";
import pokemonRouter from "./routers/pokemon.router.js";
import handlebars from "express-handlebars";

const app = express();

app.engine("handlebars", handlebars.engine());
app.set("views", "./clase-15/src/views");
app.set("view engine", "handlebars");
app.use(express.static("./clase-15/public"));

app.get("/", (req, res) => res.json({ status: "OK" }));

app.use("/api/pokemon", pokemonRouter);

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
