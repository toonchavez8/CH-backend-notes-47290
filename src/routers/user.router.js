import { Router } from "express";

import * as sessionController from "../controllers/sessionController.js";
import * as userController from "../controllers/userController.js";

const userRouter = Router();

userRouter.delete("/delete/:email", sessionController.deleteUser);
userRouter.post("/premium/:email", sessionController.togglePremium);
// Endpoint to handle file uploads
userRouter.post(
	"/:uid/documents",
	userController.fetchUserName,
	userController.upload.any(),
	userController.uploadDocuments
);

export default userRouter;
