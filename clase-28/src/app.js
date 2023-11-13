import express from "express";
import userRouter from "./routers/usersRouters.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
const port = 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
