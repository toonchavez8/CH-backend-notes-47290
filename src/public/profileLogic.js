const toggleUserRole = async (email) => {
	try {
		const response = await fetch(`/api/sessions/premium/${email}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});
		console.log("response", response);
		const responseData = await response.json();

		console.log("responseData", responseData);

		if (responseData.status === "warning") {
			Swal.fire({
				icon: "warning",
				title: "Oops...",
				text: responseData.message,
			});
		} else if (responseData.status === "success") {
			Swal.fire({
				icon: "success",
				title: "Success!",
				text: responseData.message,
			}).then((result) => {
				if (result.isConfirmed) {
					window.location.reload();
				}
				if (result.isDismissed) {
					setTimeout(() => {
						window.location.reload();
					}, 1000);
				}
			});
		}
	} catch (error) {
		console.error("Error toggling user role:", error);
	}
};

const changeRoleCheckBox = document.getElementById("changeRoleCheckBox");

if (changeRoleCheckBox) {
	changeRoleCheckBox.addEventListener("change", async (e) => {
		const email = changeRoleCheckBox.getAttribute("data-email");

		await toggleUserRole(email);
	});
}
