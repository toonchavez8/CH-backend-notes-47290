function filterProducts(category) {
	const currentUrl = new URL(window.location.href);

	// Check if the selected category is "All Categories"
	if (category === "All Categories") {
		// Remove the "category" query parameter
		currentUrl.searchParams.delete("category");
	} else {
		// Update the "category" query parameter with the selected category
		currentUrl.searchParams.set("category", category);
	}

	// Update the URL with the new query parameter or without it
	window.location.href = currentUrl.toString();
}
const addToCartBtns = document.querySelectorAll(".addTocart");

const categoryButtons = document.querySelectorAll(".categoryButton");

categoryButtons.forEach((categoryButton) => {
	categoryButton.addEventListener("click", (event) => {
		// Prevent default behavior
		event.preventDefault();
		const category = event.target.textContent.trim();
		console.log(category);
		filterProducts(category);
	});
});

addToCartBtns.forEach((addToCartBtn) => {
	const productId = addToCartBtn.getAttribute("data-product-id");

	addToCartBtn.addEventListener("click", () => {
		addToCart(productId);
	});
});

function addToCart(product) {
	console.log(`Product product:`, product);
}
