import { expect } from "chai";
import supertest from "supertest";

const Requester = supertest("http://localhost:3000");

describe("Api Sessions Routes", () => {
	describe("/api/sessions/login", () => {
		const validEmail = "toonchavez@yahoo.com";
		const validPassword = "123456";
		const invalidEmail = "invaliduser@example.com";
		const invalidPassword = "invalidpassword";

		it("should return a JWT token on successful login", async () => {
			const response = await Requester.post("/api/sessions/login")
				.send({ email: validEmail, password: validPassword })
				.expect(302);

			// Check if the JWT cookie is set
			const jwtCookie = response.header["set-cookie"].find((cookie) =>
				cookie.startsWith("PixelLendCookie")
			);
			expect(jwtCookie).to.not.be.undefined;
			// Check if the redirect location is "/products"
			expect(response.header.location).to.equal("/products");
		});

		it("should return an error on invalid login credentials", async () => {
			const response = await Requester.post("/api/sessions/login")
				.send({ email: invalidEmail, password: invalidPassword })
				.expect(302); // Assuming you're using redirects for failed logins

			// Check if the JWT cookie is not set for failed login
			const jwtCookie = response.header["set-cookie"].find((cookie) =>
				cookie.startsWith("PixelLendCookie")
			);
			expect(jwtCookie).to.be.undefined;

			// Check if the redirect location is "/failregister" or another appropriate error page
			expect(response.header.location).to.equal("/failregister");
		});
	});

	describe("/api/sessions/register", () => {
		const validRegisterData = {
			first_name: "John",
			last_name: "Doe",
			email: "john.doe@example.com",
			age: 25,
			password: "password123",
		};

		const invalidRegisterData = {
			// Missing some required fields
			first_name: "Jane",
			last_name: "Doe",
			// Missing email and age
			password: "password456",
		};

		it("should register a new user and redirect to /session/login on successful registration", async () => {
			const response = await Requester.post("/api/sessions/register")
				.send(validRegisterData)
				.expect(302);

			expect(response.header.location).to.equal("/session/login");
		});

		it("should return an error on invalid registration data", async () => {
			const response = await Requester.post("/api/sessions/register")
				.send(invalidRegisterData)
				.expect(302);

			expect(response.header.location).to.equal("/failregister");
		});
	});
});
