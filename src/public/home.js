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

async function getCartFromLocal() {
	const cartId = localStorage.getItem("cartId");

	if (cartId) {
		// if found return cartid
		return cartId;
	} else {
		const userEmail = prompt("please enter your email");

		if (!userEmail) {
			alert(
				"no cart was found so we need to make one for you, please provide your email"
			);
			return null;
		}

		try {
			// send a post request to api
			const response = await fetch("/api/cart", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ userEmail }),
			});
			if (response.ok) {
				// If the cart is successfully created, parse the response JSON
				const cartData = await response.json();

				// Store the cart ID in local storage
				localStorage.setItem("cartId", cartData._id);

				// Return the cart ID
				return cartData._id;
			} else {
				// Handle the case where there was an error creating the cart
				console.error("Error creating cart:", response.statusText);
				return null;
			}
		} catch (error) {
			// Handle any other errors that occur during the request
			console.error("Error creating cart:", error);
			return null;
		}
	}
}

function addToCart(productId) {
	// Get the quantity input field associated with this product
	const quantityInput = document.getElementById(`quantityInput_${productId}`);

	// Get the quantity value from the input field
	const quantity = quantityInput.value;

	// Create a data object to send in the request body

	console.log("productID", productId);

	// Call the getCartFromLocal function to retrieve or create a cart and get the cartId
	getCartFromLocal().then((cartId) => {
		console.log("cartId", cartId);

		if (cartId) {
			// If a cartId is available, send a POST request to add the product to the cart
			fetch(`/api/cart/${cartId}/product/${productId}`, {
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
								window.location.href = `/carts/${cartId}`;
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
	});
}

addToCartBtns.forEach((addToCartBtn) => {
	const productId = addToCartBtn.getAttribute("data-product-id");

	addToCartBtn.addEventListener("click", () => {
		addToCart(productId);
	});
});
