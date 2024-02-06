const toggleUserRole = async (email) => {
	try {
		const response = await fetch(`/api/users/premium/${email}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const responseData = await response.json();

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

const uploadDocument = async (UID, file, documentType) => {
	try {
		const formData = new FormData();
		formData.append(documentType, file);

		const response = await fetch(`/api/users/${UID}/documents/`, {
			method: "POST",
			body: formData,
		});

		const responseData = await response.json();

		if (response.ok) {
			Swal.fire({
				icon: "success",
				title: "Success!",
				text: `${documentType} uploaded successfully`,
			});
		} else {
			Swal.fire({
				icon: "error",
				title: "Error!",
				text: `Error uploading ${documentType}: ${responseData.message}`,
			});
		}
	} catch (error) {
		Swal.fire({
			icon: "error",
			title: "Error!",
			text: `Error uploading ${documentType}: ${error.message}`,
		});
	}
};

const uploadDocumentsForm = document.getElementById("uploadDocumentsForm");

if (uploadDocumentsForm) {
	uploadDocumentsForm.addEventListener("submit", async (e) => {
		e.preventDefault();

		const fileUploadBtn = document.getElementById("fileUploadBtn");
		const UID = fileUploadBtn.getAttribute("data-uid");
		console.log("UID from", UID);

		const email = changeRoleCheckBox.getAttribute("data-email");

		// Assuming identification, proofOfAddress, and bankStatement are the input file elements
		const identificationFile =
			document.getElementById("identification").files[0];
		const proofOfAddressFile =
			document.getElementById("proofOfAddress").files[0];
		const bankStatementFile = document.getElementById("bankStatement").files[0];

		// Check if any of the required files are missing
		if (!identificationFile || !proofOfAddressFile || !bankStatementFile) {
			Swal.fire({
				icon: "error",
				title: "Error!",
				text: "Please upload all required documents",
			});
			return;
		}

		// Upload each document
		await uploadDocument(UID, identificationFile, "identification");
		await uploadDocument(UID, proofOfAddressFile, "proofOfAddress");
		await uploadDocument(UID, bankStatementFile, "bankStatement");

		// After uploading all documents, toggle user role
		await toggleUserRole(email);
	});
}
