import { Router } from "express";
import messageModel from "../dao/models/messages.model.js";

const chatRouter = Router();

chatRouter.get("/", async (req, res) => {
	const messages = await messageModel.find().lean().exec();
	res.render("chat", { messages });
});

export default chatRouter;
