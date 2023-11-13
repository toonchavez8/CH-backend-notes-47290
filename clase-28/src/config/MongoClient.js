import mongoose from "mongoose";

export default class MongoClient {
	constructor() {
		this.connected = false;
		this.client = mongoose;
	}

	connect = async () => {
		try {
			await this.client.connect("mongodb://localhost:27017/clase-28", {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
			this.connected = true;
		} catch (error) {
			this.connected = false;
			console.log("Error al conectar a MongoDB");
			console.log(error);
		}
	};
}
