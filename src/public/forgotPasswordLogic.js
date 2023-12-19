const emailBox = document.getElementById("email");
const emailContainer = document.getElementById("email-container");
let invalidEmailBadge;

const submitButton = document.getElementById("submit");
const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
	event.preventDefault();

	const email = emailBox.value;

	submitButton.setAttribute("disabled", true);
	submitButton.innerHTML = "Sending...";
	submitButton.classList.add("animate-pulse");

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

		console.log("Response:", response);

		const result = await response.json();

		console.log("Result:", result);

		if (result.status === "success") {
			// Trigger SweetAlert on success
			Swal.fire(
				"Email Sent!",
				"Please check your email for password reset instructions.",
				"success"
			);

			// Reset the form and clear the email box
			form.reset();
			emailBox.value = "";

			submitButton.removeAttribute("disabled");
			submitButton.innerHTML = "Reset Password";
			submitButton.classList.remove("animate-pulse");
		} else if (response.status === 404) {
			// Trigger SweetAlert on error
			Swal.fire({
				icon: "error",
				title: "Error",
				text: result.message,
			});

			// Reset the form and clear the email box
			form.reset();
			emailBox.value = "";
		}
	} catch (error) {
		console.error("Error sending forgot password email:", error);

		// Trigger SweetAlert on error
		Swal.fire({
			icon: "error",
			title: "Error",
			text: "Internal Server Error",
		});

		// Reset the form and clear the email box
		form.reset();
		emailBox.value = "";
	} finally {
		submitButton.removeAttribute("disabled");
		submitButton.innerHTML = "Reset Password";
		submitButton.classList.remove("animate-pulse");
	}
});

// Function to validate email format
function isValidEmail(email) {
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
