import express from "express";
import userRouter from "./routers/usersRouters.js";
import MongoClient from "./config/MongoClient.js";

const app = express();

const mongoClient = new MongoClient();

mongoClient.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
const port = 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
