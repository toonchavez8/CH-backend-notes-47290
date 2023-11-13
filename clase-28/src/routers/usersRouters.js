import express from "express";
import usersController from "../controllers/usersController.js";

const userRouter = express.Router();

userRouter.get("/", usersController.getAllUsers);
userRouter.post("/", usersController.saveUser);

export default userRouter;
