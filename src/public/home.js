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

		filterProducts(category);
	});
});

function addToCart(productId, cartID) {
	// Get the quantity input field associated with this product
	const quantityInput = document.getElementById(`quantityInput_${productId}`);

	// Get the quantity value from the input field
	const quantity = quantityInput.value;

	// Send a POST request to add the product to the cart
	fetch(`/api/cart/${cartID}/product/${productId}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ quantity }),
	})
		.then((response) => {
			if (response.ok) {
				// Handle the success case where the product is added to the cart
				console.log("Product added to cart successfully");

				// Show SweetAlert message
				Swal.fire({
					icon: "success",
					title: "Product added to cart!",
					showCancelButton: true,
					confirmButtonText: "View Cart",
					cancelButtonText: "Close",
				}).then((result) => {
					if (result.isConfirmed) {
						// Redirect to the cart page with the cartId
						window.location.href = `/carts/${cartID}`;
					}
				});
			} else {
				// Handle the case where there was an error adding the product to the cart
				console.error("Error adding product to cart:", response.statusText);
			}
		})
		.catch((error) => {
			// Handle any other errors that occur during the request
			console.error("Error adding product to cart:", error);
		});
}

addToCartBtns.forEach((addToCartBtn) => {
	const productId = addToCartBtn.getAttribute("data-product-id");
	const cartID = addToCartBtn.getAttribute("data-cartID");

	addToCartBtn.addEventListener("click", () => {
		console.log("Product ID:", productId);
		console.log("Cart ID:", cartID);
		addToCart(productId, cartID);
	});
});
