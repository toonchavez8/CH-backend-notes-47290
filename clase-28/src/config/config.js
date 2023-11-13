import dotenv from "dotenv";

dotenv.config();

const persistenceValue = process.env.C28_PERSISTENCE;

if (!persistenceValue) {
	console.error("Error: C28_PERSISTENCE is undefined");
} else {
	console.log("C28_PERSISTENCE:", persistenceValue);
}

export default {
	app: {
		persistence: persistenceValue || "MONGO",
	},
};
