import mongoose from "mongoose";

const TicketModel = mongoose.model(
	"tickets",
	new mongoose.Schema({
		name: String,
		destription: String,
	})
);

export default TicketModel;
