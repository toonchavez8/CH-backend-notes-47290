import { Router } from "express";
import userController from "../controller/userController.js";

const userRouter = Router();

userRouter.get("/", userController.getUsers);
userRouter.post("/", userController.saveUser);

export default userRouter;
