// Function to show a confirmation dialog using SweetAlert
async function showDeleteConfirmation(productId, cartId) {
	const product = await fetchProduct(productId, cartId); // Fetch product details

	const result = await Swal.fire({
		title: `Delete ${product.payload.title}?`,
		text: `Are you sure you want to delete ${product.payload.title} from your cart?`,
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#d33",
		cancelButtonColor: "#3085d6",
		confirmButtonText: "Yes, delete it!",
	});

	return result.isConfirmed;
}

// Function to fetch product details
// Function to fetch product details
async function fetchProduct(productId, cartId) {
	try {
		const response = await fetch(`/api/products/${productId}`);

		if (!response.ok) {
			// Handle non-OK responses (e.g., 404 Not Found)
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const contentType = response.headers.get("content-type");
		if (contentType && contentType.includes("application/json")) {
			// Parse and return JSON response for successful requests
			return await response.json();
		} else {
			// Handle non-JSON responses (e.g., HTML error pages)
			throw new Error(`Unexpected response type: ${contentType}`);
		}
	} catch (error) {
		console.error("Error fetching product:", error.message);
		// You can handle the error as needed, e.g., show an alert
		throw error;
	}
}

// Function to delete a product
async function deleteProduct(productId) {
	const confirmed = await showDeleteConfirmation(productId);
	console.log(confirmed);

	if (confirmed) {
		const cartId = cartBtn.getAttribute("data-cart-id");
		const response = await fetch(
			`http://localhost:3000/api/cart/${cartId}/product/${productId}`,
			{
				method: "DELETE",
			}
		);

		console.log("response from delete prod", response);

		if (response.ok) {
			// Show a success message using SweetAlert
			Swal.fire({
				title: "Product Deleted",
				text: `Product with ID ${productId} has been deleted from your cart.`,
				icon: "success",
			}).then(() => {
				// Reload the page after the SweetAlert is closed
				location.reload();
			});
		} else {
			// Show an error message using SweetAlert
			Swal.fire({
				title: "Error",
				text: "Error deleting product. Please try again.",
				icon: "error",
			});
		}
	}
}

// Function to show a confirmation dialog using SweetAlert
async function showClearCartConfirmation(cartId) {
	const result = await Swal.fire({
		title: "Clear Cart",
		text: "Are you sure you want to clear your cart?",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#d33",
		cancelButtonColor: "#3085d6",
		confirmButtonText: "Yes, clear it!",
	});

	return result.isConfirmed;
}

async function clearCart(cartId) {
	const confirmed = await showClearCartConfirmation(cartId);

	if (confirmed) {
		const response = await fetch(`http://localhost:3000/api/cart/${cartId}`, {
			method: "DELETE",
		});

		if (response.ok) {
			// Show a success message using SweetAlert
			Swal.fire({
				title: "Cart Cleared",
				text: "Your cart has been cleared.",
				icon: "success",
			}).then(() => {
				// Reload the page after the SweetAlert is closed
				location.reload();
			});
		} else {
			// Show an error message using SweetAlert
			Swal.fire({
				title: "Error",
				text: "Error clearing cart. Please try again.",
				icon: "error",
			});
		}
	}
}

// Function to purchase the cart
async function purchaseCart(cartId) {
	try {
		const response = await fetch(`/api/cart/${cartId}/purchase`, {
			method: "POST", // You might need to adjust the method based on your API
		});

		const result = await response.json();
		const errorMessage = result.message;

		if (result.status === "error") {
			return Swal.fire({
				title: "Error",
				text: errorMessage,
				icon: "error",
			});
		}

		if (!response.ok) {
			// Handle non-OK responses
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const tiketCode = result.payload.purchaseCode;

		// Show a success message using SweetAlert
		Swal.fire({
			title: "Purchase Successful",
			html: `
				<p>Thank you for your purchase!</p>
				<p>Purchase Code: ${result.payload.purchaseCode}</p>
				<p>Total Amount: $${result.payload.totalAmount}</p>
				<p>Products:</p>
				<ul>
					<li>${result.payload.products[0].quantity} x ${result.payload.products[0].product}</li>
				</ul>
                <p>Please view your purchase ticket below. you will be getting an email shorty with confirmation of your purchase</p>
                
			`,
			icon: "success",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "View Purchase Ticket",
			cancelButtonText: "Close",
		}).then(async (result) => {
			if (result.isConfirmed) {
				await fetch(`/api/cart/getbill/${tiketCode}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				});

				// Redirect to the purchase ticket
				window.location.href = `/ticket/${tiketCode}`;
			} else {
				location.reload();
			}
		});
	} catch (error) {
		// Show an error message using SweetAlert
		console.log("error from purchaseCart", error);
		Swal.fire({
			title: "Error",
			text: "Error purchasing cart. Please try again.",
			icon: "error",
		});
		console.error("Error purchasing cart:", error.message);
	}
}

// Assuming you have a purchase button with the class "purchase-cart-btn"
const purchaseBtn = document.querySelector(".purchase-cart-btn");

const cartBtn = document.querySelector(".clear-cartBtn");
const deleteProdBtns = document.querySelectorAll(".delete-product-btn");

if (cartBtn) {
	cartBtn.addEventListener("click", () => {
		const cartId = cartBtn.getAttribute("data-cart-id");
		clearCart(cartId);
	});
}
if (deleteProdBtns) {
	deleteProdBtns.forEach((deleteProdBtn) => {
		deleteProdBtn.addEventListener("click", () => {
			const productId = deleteProdBtn.getAttribute("data-product-id");
			deleteProduct(productId);
		});
	});
}

if (purchaseBtn) {
	purchaseBtn.addEventListener("click", () => {
		const cartId = purchaseBtn.getAttribute("data-cart-id");
		purchaseCart(cartId);
	});
}
