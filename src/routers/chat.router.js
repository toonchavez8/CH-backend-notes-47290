import { Router } from "express";
import { chatController } from "../controllers/chatController.js";
import { passportCall } from "../utils.js";
import { handlePolicies } from "../middlewares/auth.middleware.js";

const chatRouter = Router();

chatRouter.get(
	"/",
	passportCall("jwt"),
	handlePolicies(["USER"]),
	chatController
);

export default chatRouter;
