import { faker } from "@faker-js/faker";

export const generateProducts = () => {
	const products = [];
	for (let index = 0; index < 100; index++) {
		const product = {
			title: faker.commerce.productName(),
			description: faker.commerce.productDescription(),
			price: faker.commerce.price(),
			thumbnail: [
				faker.image.urlPicsumPhotos() || "https://placeholder.com/150",
			],
			code: faker.string.alphanumeric({ length: { min: 5, max: 10 } }),
			stock: faker.string.numeric({ min: 1, max: 100 }),
			category: [faker.commerce.department(), faker.commerce.department()],
		};
		products.push(product);
	}
	return products;
};
