import { Router } from "express";
import multer from "multer";
import * as sessionController from "../controllers/sessionController.js";
import * as userController from "../controllers/userController.js";

const userRouter = Router();

// Create a GridFS storage engine
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

userRouter.delete("/delete/:email", sessionController.deleteUser);
userRouter.post("/premium/:email", sessionController.togglePremium);
// Endpoint to handle file uploads
userRouter.post(
	"/:uid/documents",
	upload.any(),
	userController.uploadDocuments
);

export default userRouter;
