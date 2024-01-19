const toggleUserRole = async (email) => {
	try {
		const response = await fetch(`/api/users/premium/${email}`, {
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

const uploadDocumentsForm = document.getElementById("uploadDocumentsForm");

if (uploadDocumentsForm) {
	uploadDocumentsForm.addEventListener("submit", async (e) => {
		e.preventDefault();

		const fileUploadBtn = document.getElementById("fileUploadBtn");
		const UID = fileUploadBtn.getAttribute("data-uid");
		console.log("UID from", UID);
		const email = changeRoleCheckBox.getAttribute("data-email");

		const identificationInput = document.getElementById("identificationInput");
		const proofOfAddressInput = document.getElementById("proofOfAddressInput");
		const bankStatementInput = document.getElementById("bankStatementInput");

		const identificationFile = identificationInput.files[0];
		const proofOfAddressFile = proofOfAddressInput.files[0];
		const bankStatementFile = bankStatementInput.files[0];

		// Check if all required files are selected
		if (!identificationFile || !proofOfAddressFile || !bankStatementFile) {
			Swal.fire({
				icon: "error",
				title: "Error!",
				text: `Error please upload all required documents`,
			});
			return;
		}

		await uploadDocument(UID, identificationFile, "identification");
		await uploadDocument(UID, proofOfAddressFile, "proofOfAddress");
		await uploadDocument(UID, bankStatementFile, "bankStatement");
		await toggleUserRole(email);
	});
}

const uploadDocument = async (UID, file, documentType) => {
	try {
		const formData = new FormData();
		formData.append("file", file);
		console.log("UID", UID);
		const response = await fetch(`/api/users/${UID}/documents/`, {
			method: "POST",
			body: formData,
		});

		const responseData = await response.json();

		console.log("responseData", responseData);

		if (response.ok) {
			// Success: Show SweetAlert success message
			Swal.fire({
				icon: "success",
				title: "Success!",
				text: `${documentType} uploaded successfully`,
			});
		} else {
			// Error: Show SweetAlert error message
			Swal.fire({
				icon: "error",
				title: "Error!",
				text: `Error uploading ${documentType}: ${responseData.message}`,
			});
		}
	} catch (error) {
		// Error: Show SweetAlert error message
		Swal.fire({
			icon: "error",
			title: "Error!",
			text: `Error uploading ${documentType}: ${error.message}`,
		});
	}
};
