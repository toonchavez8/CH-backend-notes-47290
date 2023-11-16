import express from "express";
import userRouter from "./routes/userRoutes.js";
import cors from "cors";

const app = express();

const port = process.env.PORT || 4321;

app.use(express.json());

app.use(cors());
app.use("/users", userRouter);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
