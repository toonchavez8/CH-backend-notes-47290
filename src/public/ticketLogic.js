const ticketBtn = document.querySelector(".email-button");

ticketBtn.addEventListener("click", async () => {
	const ticketId = ticketBtn.getAttribute("data-ticket");
	console.log("🚀 ~ ticketBtn.addEventListener ~ ticketId:", ticketId);

	try {
		const response = await fetch(`/api/cart/getbill/${ticketId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});
		console.log("🚀 ~ ticketBtn.addEventListener ~ response:", response);

		const data = await response.json();
		console.log("🚀 ~ ticketBtn.addEventListener ~ data:", data);

		// Check if the response is successful (you can modify this condition based on your API response structure)
		if (response.ok) {
			Swal.fire({
				icon: "success",
				title: "Email Sent!",
				text: "The email has been sent successfully.",
			});
		} else {
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "Failed to send email. Please try again.",
			});
		}
	} catch (error) {
		console.error("Error fetching data:", error);

		// Show an error alert if there is an issue with the fetch request
		Swal.fire({
			icon: "error",
			title: "Error",
			text: "Failed to fetch data. Please try again.",
		});
	}
});
