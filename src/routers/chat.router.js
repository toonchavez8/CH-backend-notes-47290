import { Router } from "express";
import { chatController } from "../controllers/chatController.js";
import { passportCall } from "../utils.js";

const chatRouter = Router();

chatRouter.get("/", passportCall("jwt"), chatController);

export default chatRouter;
