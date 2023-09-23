Swal.fire({
	title: "Authentication",
	input: "text",
	text: "Set a username for the chat",
	inputValidator: validateUsername,
	allowOutsideClick: false,
}).then((result) => {
	if (result.value) {
		const user = result.value.toLowerCase();
		console.log(user);
		initializeChat(user);
	}
});

function validateUsername(value) {
	return !value.trim() && "Please, write a valid username";
}

function initializeChat(user) {
	document.getElementById("username").innerHTML = `Welcome ${user}!`;
	const socket = io();
	const chatbox = document.getElementById("chatBox");
	const submitBtn = document.getElementById("submitBtn");

	chatbox.addEventListener("keyup", (event) => {
		if (event.key === "Enter") {
			sendMessage(socket, user, chatbox.value);
			chatbox.value = "";
		}
	});

	submitBtn.addEventListener("click", (event) => {
		event.preventDefault();
		sendMessage(socket, user, chatbox.value);
		chatbox.value = "";
	});

	socket.on("logs", (data) => {
		const divLogs = document.getElementById("log");
		const messages = generateMessages(data, user);
		divLogs.innerHTML = messages;
	});
}

function sendMessage(socket, user, message) {
	if (message.trim().length > 0) {
		socket.emit("message", { user, message });
	}
}

function generateMessages(data, currentUser) {
	let previousMessageUser = null; // Initialize previous message user

	return data
		.map((message) => {
			const showNameAndAvatar = previousMessageUser !== message.user; // Check if the user is different from the previous message

			const alignmentClass =
				message.user === currentUser
					? "flex-row-reverse justify-start align justify-items-end"
					: "justify-start";
			const colorClass =
				message.user === currentUser ? "bg-blue-700 text-white" : "bg-gray-300";

			const avatarInitial = showNameAndAvatar
				? message.user.charAt(0).toUpperCase()
				: ""; // Show avatar initial if the condition is met

			const nameAndAvatar = showNameAndAvatar
				? `
		  <figure src="placeholder.jpg" alt="User Avatar" class="w-8 h-8 rounded-full aspect-square ${colorClass} text-lg flex justify-center items-center uppercase">${avatarInitial}</figure>
		  <span class="text-xs font-semibold">${message.user}</span>
		`
				: ""; // Empty string if the condition is not met

			const messageClass = showNameAndAvatar
				? "py-2 px-4 me-2 mt-1 rounded-xl mb-2"
				: "py-2 px-4 me-2 my-0 rounded-xl"; // Reduce padding if the condition is met

			previousMessageUser = message.user; // Update previous message user

			return `
		  <article class="flex items-center mb-2 gap-1 ${alignmentClass}">
			<div class="flex flex-col">
			  ${nameAndAvatar}
			  <p class="${messageClass} ${colorClass}">
				${message.message}
			  </p>
			</div>
		  </article>
		`;
		})
		.join("");
}
