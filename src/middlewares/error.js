import CustomErrorIDs from "../errors/enums.js";

export default (error, req, res, next) => {
	console.log(error.cause);

	switch (error.code) {
		case CustomErrorIDs.ROUTING_ERROR:
			res.status(404).send({ status: "error", error: error.name });
			break;

		case CustomErrorIDs.INVALID_INPUT:
			res
				.status(400)
				.send({ status: "error", error: error.name, message: error.message });
			break;

		case CustomErrorIDs.DATABASE_ERROR:
			res
				.status(500)
				.send({ status: "error", error: error.name, message: error.message });
			break;

		default:
			res.status(500).send({ status: "error", error: error.name });
			break;
	}
};
