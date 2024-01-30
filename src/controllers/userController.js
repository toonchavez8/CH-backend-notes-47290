import multer from "multer";
import UserModel from "../models/users.model.js";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		let localDestination = "uploads";

		switch (file.fieldname) {
			case `identification`:
				localDestination += "/identification";
				break;
			case "proofOfAddress":
				localDestination += "/proofOfAddress";
				break;
			case "bankStatement":
				localDestination += "/bankStatement";
				break;
			default:
				break;
		}

		cb(null, `src/${localDestination}`); // specify the directory where you want to store the documents
	},
	filename: function (req, file, cb) {
		console.log("req.userName from filename", req.userName);
		const extension = file.originalname.split(".").pop();
		const fileName = `${file.fieldname}_${req.userName}.${extension}`;
		cb(null, fileName);
	},
});
// Create multer instance with the defined storage
export const upload = multer({ storage: storage });

// Middleware to fetch user name based on user ID
export const fetchUserName = async (req, res, next) => {
	try {
		const userId = req.params.uid;
		const user = await UserModel.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		const first_name = user.first_name;
		req.userName = first_name.replace(/\s/g, "_");

		next();
	} catch (err) {
		console.error("Error fetching user name:", err);
		res.status(500).json({ message: "Internal server error" });
	}
};

// Upload documents route
export const uploadDocuments = async (req, res, next) => {
	try {
		const userId = req.params.uid;

		const updatePromises = req.files.map(async (file) => {
			await UserModel.findByIdAndUpdate(userId, {
				$push: {
					documents: {
						name: file.filename,
						reference: file.path,
					},
				},
			});
		});

		res.status(200).json({ message: "Files uploaded successfully" });
	} catch (err) {
		console.error("Error uploading files:", err);
		res.status(500).json({ message: "Internal server error" });
	} finally {
		next();
	}
};

// Apply the fetchUserName middleware before the uploadDocuments route
export const uploadDocumentsWithUserName = [fetchUserName, uploadDocuments];
