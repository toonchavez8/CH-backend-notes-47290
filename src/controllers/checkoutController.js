import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import dotenv from "dotenv";
import { TicketService } from "../repositories/index.js"; // Import TicketService or the service responsible for retrieving purchase data

dotenv.config();

const getBill = async (req, res) => {
	try {
		const purchaseCode = req.params.ticket; // Use req.params to get the purchase code from the URL parameter
		console.log("🚀 ~ getBill ~ purchaseCode:", purchaseCode);

		// Use environment variables for better security
		const emailUser = process.env.NODEMAILER_USER;
		const emailPassword = process.env.NODEMAILER_PASS;

		let config = {
			service: "gmail",
			auth: {
				user: emailUser,
				pass: emailPassword,
			},
		};

		let transporter = nodemailer.createTransport(config);
		let Mailgenerator = new Mailgen({
			theme: "cerberus",
			product: {
				name: "PixelLend",
				link: "http://www.PixelLend.com",
			},
		});

		// Retrieve purchase data based on the purchase code
		const ticket = await TicketService.getById(purchaseCode); // Use the appropriate service method to retrieve ticket data

		const userEmail = ticket.buyerEmail;

		let response = {
			body: {
				intro: `Hello, this is an email confirming your purchase with code: ${purchaseCode}`,
				table: {
					data: ticket.products.map((product) => ({
						item: product.product.title,
						descripcion: product.product.description,
						price: product.product.price.toString(),
						quantity: product.quantity.toString(),
						total: (product.product.price * product.quantity).toString(),
					})),
				},
				outro: "Thank you for your purchase!",
			},
		};

		let mail = Mailgenerator.generate(response);

		let message = {
			from: "PixelLend",
			to: userEmail,
			subject: `Order PixelLend - Code: ${purchaseCode}`,
			html: mail,
		};

		// Use async/await for sending emails
		await transporter.sendMail(message);

		res.status(200).json({
			message: "Correo enviado",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Error al enviar el correo",
		});
	}
};

export default getBill;
