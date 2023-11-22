import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
	{
		purchaseCode: { type: String, required: true, unique: true },
		products: [
			{
				product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
				price: Number,
				quantity: Number,
			},
		],
		totalAmount: Number,
		buyerEmail: { type: String, ref: "User" },
	},
	{ timestamps: { createdAt: "purchase_datetime" } }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
