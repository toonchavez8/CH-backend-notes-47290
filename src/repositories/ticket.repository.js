export default class TicketRepository {
	constructor(dao) {
		this.dao = dao;
	}

	getAll = async () => await this.dao.getAll();
	getById = async (id) => await this.dao.getById(id);
	getAllPaginate = async (req, PORT) =>
		await this.dao.getAllPaginate(req, PORT);
	create = async (data) => await this.dao.create(data);
	update = async (id, data) => await this.dao.update(id, data);
	delete = async (id) => await this.dao.delete(id);
	getTicketsByBuyerEmail = async (email) =>
		await this.dao.getTicketsByBuyerEmail(email);
}
