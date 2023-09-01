const socket = io();

document.getElementById("createBtn").addEventListener("click", (event) => {
	// Prevent the default form submission behavior
	event.preventDefault();
	console.log("Button clicked!");

	const body = {
		title: document.getElementById("title").value,
		description: document.getElementById("description").value,
		price: document.getElementById("price").value,
		code: document.getElementById("code").value,
		stock: document.getElementById("stock").value,
		thumbnail: document.getElementById("image").value,
	};

	fetch("/api/products", {
		method: "post",
		body: JSON.stringify(body),
		headers: {
			"Content-type": "application/json",
		},
	})
		.then((result) => result.json())
		.then((result) => {
			if (result.error) {
				throw new Error(result.error);
			}
		})
		.then(() => {
			// Reset the form after successful submission
			document.getElementById("createForm").reset();

			return fetch("/api/products");
		})
		.then((result) => result.json())
		.then((result) => {
			if (result.error) throw new Error(result.error);
			socket.emit("productList", result.payload);
			let timerInterval;

			Swal.fire({
				title: "Success",
				icon: "success",
				text: `Product with ${body.title} added to database`,
				timer: 2000,
				timerProgressBar: true,
				didOpen: () => {
					Swal.showLoading();
					const b = Swal.getHtmlContainer().querySelector("b"); // Get the element using the correct selector
					if (b) {
						timerInterval = setInterval(() => {
							b.textContent = Swal.getTimerLeft();
						}, 100);
					}
				},
				willClose: () => {
					clearInterval(timerInterval);
				},
			}).then((result) => {
				/* Read more about handling dismissals below */
				if (result.dismiss === Swal.DismissReason.timer) {
					console.log("I was closed by the timer");
				}
			});
		})
		.catch((err) =>
			Swal.fire({
				title: "Error!",
				text: err,
				icon: "error",
				confirmButtonText: "oh ok ",
			})
		)
		.finally(o);
});

function deleteProduct(id) {
	let deletedProduct;
	fetch(`/api/products/${id}`, {
		method: `delete`,
	})
		.then((result) => result.json())
		.then((result) => {
			if (result.error) throw new Error(result.error);
			deletedProduct = result;
			console.log(deletedProduct);
		})
		.then(() => fetch("/api/products"))
		.then((result) => result.json())
		.then((result) => {
			if (result.error) throw new Error(result.error);
			socket.emit("productList", result.payload);
			let timerInterval;

			Swal.fire({
				title: "Success",
				icon: "success",
				text: `Product with id ${deletedProduct.productDeleted.id} called ${deletedProduct.productDeleted.title} Deleted`,
				timer: 2000,
				timerProgressBar: true,
				didOpen: () => {
					Swal.showLoading();
					const b = Swal.getHtmlContainer().querySelector("b"); // Get the element using the correct selector
					if (b) {
						timerInterval = setInterval(() => {
							b.textContent = Swal.getTimerLeft();
						}, 100);
					}
				},
				willClose: () => {
					clearInterval(timerInterval);
				},
			}).then((result) => {
				/* Read more about handling dismissals below */
				if (result.dismiss === Swal.DismissReason.timer) {
					console.log("I was closed by the timer");
				}
			});
		})
		.catch((err) =>
			Swal.fire({
				title: "Error!",
				text: err,
				icon: "error",
				confirmButtonText: "oh ok ",
			})
		);
}

// Select all delete buttons by their common class
const deleteButtons = document.querySelectorAll(".delete-product-btn");

// Attach a click event listener to each delete button
deleteButtons.forEach((deleteButton) => {
	deleteButton.addEventListener("click", () => {
		const productId = deleteButton.getAttribute("data-product-id");
		// Call the deleteProduct function with the product ID
		deleteProduct(productId);
	});
});

function updateTable(products) {
	const tbody = document.querySelector("#realProductsTable tbody");

	// Clear the existing table rows
	tbody.innerHTML = "";

	// Loop through the products and add rows to the table
	products.forEach((product) => {
		const row = document.createElement("tr");
		row.classList.add("even:bg-gray-600", "even:bg-opacity-10");

		// Create table cells for each product attribute
		const idCell = document.createElement("td");
		idCell.textContent = product.id;

		const titleCell = document.createElement("td");
		titleCell.textContent = product.title;

		const imageCell = document.createElement("td");
		// Create and set up an image element for the product's thumbnail
		const image = document.createElement("img");
		image.src = product.thumbnail;
		image.alt = product.title;
		image.className = "w-full h-full object-cover";
		const imageContainer = document.createElement("div");
		imageContainer.className = "aspect-square w-24 h-24";
		imageContainer.appendChild(image);
		imageCell.appendChild(imageContainer);

		const descriptionCell = document.createElement("td");
		descriptionCell.textContent = product.description;

		const codeCell = document.createElement("td");
		codeCell.textContent = product.code;

		const stockCell = document.createElement("td");
		stockCell.textContent = product.stock;

		const priceCell = document.createElement("td");
		priceCell.textContent = product.price;

		const actionsCell = document.createElement("td");
		const deleteButton = document.createElement("button");
		deleteButton.textContent = "Delete";
		deleteButton.className =
			"text-lg text-white-600 bg-red-600 rounded px-4 py-0 md:py-2";
		deleteButton.addEventListener("click", () => {
			// Add your logic to delete the product here
			// For example, you can call a deleteProduct function passing the product ID
			deleteProduct(product.id);
		});
		actionsCell.appendChild(deleteButton);

		// Append all cells to the row
		row.appendChild(idCell);
		row.appendChild(titleCell);
		row.appendChild(imageCell);
		row.appendChild(descriptionCell);
		row.appendChild(codeCell);
		row.appendChild(stockCell);
		row.appendChild(priceCell);
		row.appendChild(actionsCell);

		// Append the row to the table body
		tbody.appendChild(row);
	});
}

socket.on("updatedProducts", (data) => {
	// Call the updateTable function with the new product data
	updateTable(data);
});
