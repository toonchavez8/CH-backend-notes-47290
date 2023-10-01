const socket = io();

document.getElementById("createBtn").addEventListener("click", (event) => {
	// Prevent the default form submission behavior
	event.preventDefault();

	const categoryInput = document.getElementById("categories");
	const categories = categoryInput.value
		.split(",")
		.map((category) => category.trim());

	const body = {
		title: document.getElementById("title").value,
		description: document.getElementById("description").value,
		price: document.getElementById("price").value,
		code: document.getElementById("code").value,
		stock: document.getElementById("stock").value,
		thumbnail: document.getElementById("image").value,
		category: categories,
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
		);
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
			console.log(deletedProduct.productDeleted);
			Swal.fire({
				title: "Success",
				icon: "success",
				text: `Product with id ${deletedProduct.productDeleted._id.slice(
					-4
				)} called ${deletedProduct.productDeleted.title} Deleted`,
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

// select all edit buttons by their common class
const editButtons = document.querySelectorAll(".edit-product-btn");

// Attach a click event listener to each edit button
editButtons.forEach((editButton) => {
	editButton.addEventListener("click", (event) => {
		event.preventDefault();
		const productId = editButton.getAttribute("data-product-id");
		// Call the editProduct function with the product ID
		editProduct(productId);
	});
});

function updateProduct(id) {
	const categoryInput = document.getElementById("categories");
	const categories = categoryInput.value
		.split(",")
		.map((category) => category.trim());
	// Retrieve the updated product data from the form
	const updatedProduct = {
		title: document.getElementById("title").value,
		description: document.getElementById("description").value,
		price: document.getElementById("price").value,
		code: document.getElementById("code").value,
		stock: document.getElementById("stock").value,
		thumbnail: document.getElementById("image").value,
		category: categories,
	};
	console.log(updatedProduct);

	// Send a PUT request to update the product with the provided ID
	fetch(`/api/products/${id}`, {
		method: "put",
		body: JSON.stringify(updatedProduct),
		headers: {
			"Content-type": "application/json",
		},
	})
		.then((result) => result.json())
		.then((result) => {
			if (result.error) {
				throw new Error(result.error);
			}

			// Reset the form after successful update
			document.getElementById("createForm").reset();

			// Hide the "Update" button
			const updateBtn = document.getElementById("updateBtn");
			updateBtn.style.display = "none";

			// Enable the "Create" button
			const createBtn = document.getElementById("createBtn");
			createBtn.disabled = false;
			createBtn.classList.remove("pointer-events-none", "opacity-50");

			// Fetch and update the product list (similar to what you do after creation)
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
				text: `Product with id ${id} updated`,
				timer: 2000,
				timerProgressBar: true,
				didOpen: () => {
					Swal.showLoading();
					const b = Swal.getHtmlContainer().querySelector("b");
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
				if (result.dismiss === Swal.DismissReason.timer) {
					console.log("I was closed by the timer");
				}
			});
		})
		.catch((err) => {
			Swal.fire({
				title: "Error!",
				text: err,
				icon: "error",
				confirmButtonText: "Oh ok",
			});
		});
}

function editProduct(id) {
	console.log(`Editing product with id ${id}`);

	window.scrollTo({ top: 0, behavior: "smooth" });
	// Retrieve the product data by product ID (use an API call if needed)
	fetch(`/api/products/${id}`)
		.then((result) => result.json())
		.then((productData) => {
			// Populate the form fields with the product data
			const product = productData.payload;
			document.getElementById("title").value = product.title;
			document.getElementById("description").value = product.description;
			document.getElementById("price").value = product.price;
			document.getElementById("code").value = product.code;
			document.getElementById("stock").value = product.stock;
			document.getElementById("image").value = product.thumbnail;
			const categories = product.category.join(",");
			document.getElementById("categories").value = categories;

			// Disable the "Create" button
			const createBtn = document.getElementById("createBtn");
			createBtn.classList.add("pointer-events-none", "opacity-50");
			createBtn.disabled = true;

			// Show the "Update" button and add a click event listener
			const updateBtn = document.getElementById("updateBtn");
			updateBtn.style.display = "inline-block";

			// Add a click event listener for updating the product and scrolling to the top of the page
			updateBtn.addEventListener("click", (event) => {
				event.preventDefault();
				console.log("Updating product");
				// Call the updateProduct function with the product ID
				updateProduct(id);

				// Scroll to the top of the page
			});
		})
		.catch((err) => {
			// Handle errors if the fetch request fails
			console.error(err);
		});
}

function updateTable(processedProducts) {
	const tbody = document.querySelector("#realProductsTable tbody");

	// Clear the existing table rows
	tbody.innerHTML = "";

	// Loop through the processed products and add rows to the table
	processedProducts.forEach((product) => {
		const row = document.createElement("tr");
		row.classList.add("even:bg-gray-600", "even:bg-opacity-10");

		// Create table cells for each product attribute
		const idCell = document.createElement("td");
		idCell.textContent = product._id.slice(-4);
		idCell.classList.add("border-b", "border-purple-600", "px-4", "py-2");

		const titleCell = document.createElement("td");
		titleCell.textContent = product.title;
		titleCell.classList.add("border-b", "border-purple-600", "px-4", "py-2");

		const imageCell = document.createElement("td");
		imageCell.classList.add(
			"hidden",
			"md:table-cell",
			"border-b",
			"border-purple-600"
		);

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
		descriptionCell.classList.add(
			"hidden",
			"lg:table-cell",
			"border-b",
			"border-purple-600",
			"text-center"
		);

		const codeCell = document.createElement("td");
		codeCell.textContent = product.code;
		codeCell.classList.add(
			"border-b",
			"border-purple-600",
			"px-4",
			"py-2",
			"hidden",
			"sm:table-cell"
		);
		const categoryCell = document.createElement("td");
		categoryCell.classList.add(
			"border-b",
			"border-purple-600",
			"px-4",
			"py-2",
			"hidden",
			"sm:table-cell"
		);

		const categoryContainer = document.createElement("div");
		categoryContainer.classList.add("flex", "flex-col", "gap-1", "w-full");

		console.log("product", product.category);

		// Loop through product categories and create span elements
		product.category.forEach((category) => {
			const categoryElement = document.createElement("span");
			categoryElement.textContent = category;
			categoryElement.classList.add(
				"bg-gray-800",
				"text-white",
				"px-2",
				"py-1",
				"rounded-full",
				"text-xs",
				"mr-1",
				"hover:bg-purple-500",
				"transition-colors",
				"duration-300",
				"ease-in-out",
				"grow",
				"text-center",
				"whitespace-nowrap"
			);

			// Append each category element to the category container
			categoryContainer.appendChild(categoryElement);
		});

		// Append the category container to the category cell
		categoryCell.appendChild(categoryContainer);

		const stockCell = document.createElement("td");
		stockCell.textContent = product.stock;
		stockCell.classList.add(
			"border-b",
			"border-purple-600",
			"px-4",
			"py-2",
			"hidden",
			"sm:table-cell"
		);

		const priceCell = document.createElement("td");
		priceCell.textContent = product.price;
		priceCell.classList.add("border-b", "border-purple-600", "px-4", "py-2");

		const actionsCell = document.createElement("td");
		actionsCell.classList.add(
			"border-b",
			"border-purple-600",
			"px-4",
			"py-2",
			"text-center",
			"h-full"
		);

		const buttonContainer = document.createElement("div");
		buttonContainer.classList.add("flex", "flex-row-reverse", "gap-2");

		const deleteButton = document.createElement("button");
		deleteButton.innerHTML = `
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white hover:text-red-500 transition-colors duration-300 ease-in-out">
		  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0">
		  </path>
		</svg>
	  `;
		deleteButton.classList.add("rounded", "p-2", "delete-product-btn");
		deleteButton.setAttribute("data-product-id", product._id);
		deleteButton.addEventListener("click", () => {
			// Call the deleteProduct function with the product ID
			deleteProduct(product._id);
		});

		const editButton = document.createElement("button");
		editButton.innerHTML = `
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
		  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10">
		  </path>
		</svg>
	  `;
		editButton.classList.add(
			"text-lg",
			"text-white",
			"bg-blue-500",
			"hover:bg-blue-700",
			"rounded",
			"p-2",
			"ml-2",
			"edit-product-btn"
		);
		editButton.setAttribute("data-product-id", product._id);
		editButton.addEventListener("click", () => {
			const productId = editButton.getAttribute("data-product-id");
			// Call the editProduct function with the product ID
			editProduct(productId);
		});

		// Append buttons to the button container
		buttonContainer.appendChild(deleteButton);
		buttonContainer.appendChild(editButton);

		// Append the button container to the actions cell
		actionsCell.appendChild(buttonContainer);

		// Append all cells to the row
		row.appendChild(idCell);
		row.appendChild(titleCell);
		row.appendChild(imageCell);
		row.appendChild(descriptionCell);
		row.appendChild(codeCell);
		row.appendChild(categoryCell);
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
