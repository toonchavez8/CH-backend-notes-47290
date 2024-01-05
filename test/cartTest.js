import { expect } from "chai";
import supertest from "supertest";

const Requester = supertest("http://localhost:3000");

describe("Api Carts Routes", () => {
	describe("GET /api/cart/:cid", () => {
		let jwtCookie;
		let cartId = "6598181c403daa9958d1bd3f"; // Replace with a valid cart ID

		before(async () => {
			const response = await Requester.post("/api/sessions/login")
				.send({ email: "test@user.com", password: "password" })
				.expect(302);

			jwtCookie = response.header["set-cookie"].find((cookie) =>
				cookie.startsWith("PixelLendCookie")
			);
		});

		it("should get a cart by ID with an array of products", async () => {
			const response = await Requester.get(`/api/cart/${cartId}`)
				.set("Cookie", jwtCookie)
				.expect(200);

			expect(response.body.status).to.equal("Success");
			expect(response.body.payload).to.be.an("object");

			const { _id, userEmail, products } = response.body.payload;

			expect(_id).to.be.a("string");
			expect(userEmail).to.equal("test@user.com");
			expect(products).to.be.an("array");
		});
	});
});

describe("POST /api/cart/:cid/product/:pid", () => {
	let jwtCookie;
	let cartId = "6598181c403daa9958d1bd3f";
	let productId = "65810f3e3160c42463eb78fc";

	before(async () => {
		const response = await Requester.post("/api/sessions/login")
			.send({ email: "test@user.com", password: "password" })
			.expect(302);

		jwtCookie = response.header["set-cookie"].find((cookie) =>
			cookie.startsWith("PixelLendCookie")
		);
	});

	it("should add a product to the cart", async () => {
		const response = await Requester.post(
			`/api/cart/${cartId}/product/${productId}`
		)
			.set("Cookie", jwtCookie)
			.expect(200);

		expect(response.body.userEmail).to.be.a("string");
		expect(response.body.products).to.be.an("array");
	});
});
