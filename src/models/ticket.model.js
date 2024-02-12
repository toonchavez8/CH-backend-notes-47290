import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
	{
		purchaseCode: { type: String, required: true, unique: true },
		products: [
			{
				productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
				price: Number,
				quantity: Number,
				_id: false,
			},
		],
		totalAmount: Number,
		buyerEmail: { type: String, ref: "User" },
	},
	{ timestamps: { createdAt: "purchase_datetime" } }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
