function filterProducts(category) {
	const currentUrl = window.location.href;
	const urlWithoutQuery = currentUrl.split("?")[0]; // Remove existing query parameters
	let newUrl = urlWithoutQuery;
	if (category) {
		newUrl += `?category=${category}`;
	}
	window.location.href = newUrl;
}
const addToCartBtns = document.querySelectorAll(".addTocart");

addToCartBtns.forEach((addToCartBtn) => {
	const productId = addToCartBtn.getAttribute("data-product-id");

	addToCartBtn.addEventListener("click", () => {
		addToCart(productId);
	});
});

function addToCart(product) {
	console.log(`Product product:`, product);
}
