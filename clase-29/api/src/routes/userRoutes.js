import { Express } from "express";
import userController from "../controller/userController.js";

const userRouter = Express.Router();

userRouter.get("/", userController.getUsers);
userRouter.post("/", userController.saveUser);

export default userRouter;
