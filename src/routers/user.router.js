import { Router } from "express";
import * as sessionController from "../controllers/sessionController.js";

const userRouter = Router();

userRouter.delete("/user/:email", sessionController.deleteUser);
userRouter.post("/premium/:email", sessionController.togglePremium);

export default userRouter;
