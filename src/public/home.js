function filterProducts(category) {
	const currentUrl = window.location.href;
	const urlWithoutQuery = currentUrl.split("?")[0]; // Remove existing query parameters
	let newUrl = urlWithoutQuery;
	if (category) {
		newUrl += `?category=${category}`;
	}
	window.location.href = newUrl;
}
