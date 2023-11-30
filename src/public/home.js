function filterProducts(category) {
	console.log("Filtering products by category:", category);
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

document.addEventListener("DOMContentLoaded", function () {
	// Find the categoryFilter select element
	const categoryFilter = document.getElementById("categoryFilter");

	// Check if the categoryFilter element is found
	if (categoryFilter) {
		// Attach the change event listener
		categoryFilter.addEventListener("change", function (event) {
			// Call your filterProducts function when the value changes
			filterProducts(event.target.value);
		});
	}
});
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

// ...

if (document.getElementById("addMockProducts")) {
	const addMockProductsBtn = document.getElementById("addMockProducts");

	addMockProductsBtn.addEventListener("click", async (event) => {
		event.preventDefault();

		try {
			const response = await fetch("/api/products/create/mockingproducts", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				// Mock products created successfully
				Swal.fire({
					icon: "success",
					title: "Mock products created!",
					text: "100 mock products have been added to the database.",
					confirmButtonText: "OK",
				}).then(() => {
					// Refresh the page
					location.reload();
				});
			} else {
				// Handle the case where there was an error creating mock products
				console.error("Error creating mock products:", response.statusText);
				Swal.fire({
					icon: "error",
					title: "Error",
					text: "Failed to create mock products. Please try again.",
					confirmButtonText: "OK",
				});
			}
		} catch (error) {
			// Handle any other errors that occur during the fetch
			console.error("Error creating mock products:", error);
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "An error occurred. Please try again.",
				confirmButtonText: "OK",
			});
		}
	});
}
