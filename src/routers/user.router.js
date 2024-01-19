import { Router } from "express";
import * as sessionController from "../controllers/sessionController.js";

const userRouter = Router();

userRouter.delete("/delete/:email", sessionController.deleteUser);
userRouter.post("/premium/:email", sessionController.togglePremium);

export default userRouter;
