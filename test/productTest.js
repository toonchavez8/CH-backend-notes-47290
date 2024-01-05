import { expect } from "chai";
import supertest from "supertest";

const Requester = supertest("http://localhost:3000");

describe("Api Products Routes", () => {
	describe("GET /api/products", () => {
		let jwtCookie;

		before(async () => {
			const response = await Requester.post("/api/sessions/login")
				.send({ email: "test@user.com", password: "password" })
				.expect(302);

			jwtCookie = response.header["set-cookie"].find((cookie) =>
				cookie.startsWith("PixelLendCookie")
			);
		});

		it("should get a paginated list of products with default values", async () => {
			const response = await Requester.get("/api/products")
				.set("Cookie", jwtCookie)
				.expect(200);

			expect(response.body.status).to.equal("success");
			expect(response.body.payload).to.be.an("array");
		});

		it("should get a paginated list of products with custom limit and page", async () => {
			const limit = 5;
			const page = 2;

			const response = await Requester.get(
				`/api/products?limit=${limit}&page=${page}`
			)
				.set("Cookie", jwtCookie)
				.expect(200);

			expect(response.body.status).to.equal("success");
			expect(response.body.payload).to.be.an("array");
		});
	});

	describe("GET /api/products/:pid", () => {
		let jwtCookie;
		let productId = "65810f3e3160c42463eb78fc";
		before(async () => {
			const response = await Requester.post("/api/sessions/login")
				.send({ email: "test@user.com", password: "password" })
				.expect(302);

			jwtCookie = response.header["set-cookie"].find((cookie) =>
				cookie.startsWith("PixelLendCookie")
			);
		});

		it("should get a single product by ID", async () => {
			const response = await Requester.get(`/api/products/${productId}`)
				.set("Cookie", jwtCookie)
				.expect(200);

			expect(response.body.payload).to.be.an("object");
			expect(response.body.payload).to.have.property("_id", productId);
		});
	});
});
