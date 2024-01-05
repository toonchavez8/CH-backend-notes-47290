import { expect } from "chai";
import supertest from "supertest";
import { after } from "mocha";

const Requester = supertest("http://localhost:3000");

describe("Api Sessions Routes", () => {
	describe("/api/sessions/login", () => {
		const validEmail = "test@user.com";
		const validPassword = "password";
		const invalidEmail = "invaliduser@example.com";
		const invalidPassword = "invalidpassword";

		it("should return a JWT token on successful login", async () => {
			const response = await Requester.post("/api/sessions/login")
				.send({ email: validEmail, password: validPassword })
				.expect(302);

			const jwtCookie = response.header["set-cookie"].find((cookie) =>
				cookie.startsWith("PixelLendCookie")
			);
			expect(jwtCookie).to.not.be.undefined;

			expect(response.header.location).to.equal("/products");
		});

		it("should return an error on invalid login credentials", async () => {
			const response = await Requester.post("/api/sessions/login")
				.send({ email: invalidEmail, password: invalidPassword })
				.expect(302);

			const jwtCookie = response.header["set-cookie"].find((cookie) =>
				cookie.startsWith("PixelLendCookie")
			);
			expect(jwtCookie).to.be.undefined;

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

		let createdUserEmail = validRegisterData.email;
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

		after(async function () {
			try {
				const deleteCart = await Requester.delete(
					`/api/cart/delete/cart/${createdUserEmail}`
				);

				const deleteUser = await Requester.delete(
					`/api/sessions/user/${createdUserEmail}`
				);

				if (deleteCart.status !== 200) {
					console.error(`Error deleting cart. Status: ${deleteCart.status}`);
					throw new Error(`Error deleting cart. Status: ${deleteCart.status}`);
				}

				if (deleteUser.status !== 200) {
					console.error(`Error deleting user. Status: ${deleteUser.status}`);
					throw new Error(`Error deleting user. Status: ${deleteUser.status}`);
				}
			} catch (error) {
				console.error(error);
				throw error;
			}
		});
	});
});
