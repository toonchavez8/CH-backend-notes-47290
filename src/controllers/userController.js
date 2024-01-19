import multer from "multer";
import UserModel from "../models/users.model.js";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/"); // specify the directory where you want to store the documents
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname); // use the original name of the file
	},
});

const upload = multer({ storage: storage });

export const uploadDocuments = async (req, res, next) => {
	try {
		upload.array("document")(req, res, (err) => {
			if (err) {
				console.error("Error uploading files:", err);
				return res.status(500).json({ message: "Internal server error" });
			}
			next(); // Call next to proceed to the next middleware/route handler
		});

		// Extract userId from the request (assuming userId is available in the request)
		const userId = req.params.uid;

		console.log("userid", userId);

		const updatePromises = req.files.map(async (file) => {
			await UserModel.findByIdAndUpdate(userId, {
				$push: {
					documents: {
						name: file.originalname,
						reference: file.filename,
					},
				},
			});
		});

		await Promise.all(updatePromises);

		res.status(200).json({ message: "Files uploaded successfully" });
	} catch (err) {
		console.error("Error uploading files:", err);
		res.status(500).json({ message: "Internal server error" });
	} finally {
		next(); // Call next in the finally block to ensure it is called once
	}
};
