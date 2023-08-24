const socketClient = io();

let chatBox = document.getElementById("chatBox");
let submitBtn = document.getElementById("submitBtn");

chatBox.addEventListener("keyup", (event) => {
	if (event.key === "Enter") {
		socketClient.emit("message", chatBox.value);
	}
});

socketClient.on("history", (data) => {
	let history = document.getElementById("history");
	let messages = "";

	data.forEach((message) => {
		console.log(message);
		const userId = message.userId;
		const lastThreeChars = userId.slice(-3); // Get the last 3 characters of the userid

		messages += `
            <div class="flex items-center mb-2">
                <div src="placeholder.jpg" alt="User Avatar" class="w-8 h-8 rounded-full mr-2 bg-slate-600"></div>
                <span class="font-semibold">${lastThreeChars}</span>:
                <p class="bg-blue-100 p-2 mx-2 rounded-lg mb-2 text-blue-900">
                    ${message.message}
                </p>
            </div>
        `;
	});

	history.innerHTML = messages;
	chatBox.value = "";
});
