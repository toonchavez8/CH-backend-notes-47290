import ticketModel from "../models/ticket.model.js";

export default class TicketMongoDAO {
	getAll = async () => await ticketModel.find().lean().exec();
	getById = async (purchaseCode) =>
		await ticketModel
			.findOne({ purchaseCode })
			.populate("products.product")
			.lean()
			.exec();
	create = async (data) => await ticketModel.create(data);
	update = async (id, data) =>
		await ticketModel.findByIdAndUpdate(id, data, { returnDocument: "after" });
	delete = async (id) => await ticketModel.findByIdAndDelete(id);
	getTicketsByBuyerEmail = async (buyerEmail) => {
		return await ticketModel.find({ buyerEmail }).lean().exec();
	};
}
