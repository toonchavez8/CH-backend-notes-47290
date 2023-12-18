const emailBox = document.getElementById("email");

const emailContainer = document.getElementById("email-container");
let invalidEmailBadge;

document.querySelector("form").addEventListener("submit", async (event) => {
	event.preventDefault();

	const email = emailBox.value;

	// Validate email format
	if (!isValidEmail(email)) {
		// Show SweetAlert for invalid email
		Swal.fire({
			icon: "error",
			title: "Invalid Email",
			text: "Please enter a valid email address.",
		});

		// Add or update the invalid email badge
		if (!invalidEmailBadge) {
			invalidEmailBadge = addInvalidEmailBadge();
			emailContainer.insertBefore(invalidEmailBadge, emailBox);
		}

		// Make the email container red

		emailBox.classList.remove("rounded");
		emailBox.classList.add("rounded-b-lg", "border-red-500");
		return;
	}

	// If the email is valid, remove the badge and reset the email container
	if (invalidEmailBadge) {
		invalidEmailBadge.remove();
		invalidEmailBadge = null;
	}

	emailBox.classList.remove("rounded-b-lg", "border-red-500");

	// Proceed with form submission
	try {
		const response = await fetch("/api/sessions/forgot-password", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email }),
		});

		const result = await response.json();

		if (result.status === "success") {
			// Trigger SweetAlert on success
			Swal.fire(
				"Email Sent!",
				"Please check your email for password reset instructions.",
				"success"
			);
		} else {
			// Handle other cases or errors
			console.error(result.message);
		}
	} catch (error) {
		console.error("Error:", error.message);
	}
});

// Function to validate email format
function isValidEmail(email) {
	// You can implement a more sophisticated email validation if needed
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

// Function to add an invalid email badge
function addInvalidEmailBadge() {
	const badge = document.createElement("div");
	badge.textContent = "Invalid Email";
	badge.className = "bg-red-400 text-white p-1 pb-0 rounded-t-lg";
	return badge;
}
