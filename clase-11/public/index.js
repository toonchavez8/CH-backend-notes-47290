console.log("this works in browser");

Swal.fire({
	title: "Authentication",
	input: "text",
	text: "Set a username for the chat",
	inputValidator: (value) => {
		return !value.trim() && "Please, write a valid username";
	},
	allowOutsideClick: false,
}).then((result) => {
	let user = result.value;
	document.getElementById("username").innerHTML = user;
	let socket = io();

	let chatbox = document.getElementById("chatbox");
	chatbox.addEventListener("keyup", (e) => {
		if (e.key === "Enter") {
			if (chatbox.value.trim().length > 0) {
				socket.emit("message", {
					user,
					message: chatbox.value,
				});
				chatbox.value = "";
			}
		}
	});

	socket.on("logs", (data) => {
		const divLogs = document.getElementById("log");
		let messages = "";
		data.reverse().forEach((message) => {
			const alignmentClass =
				message.user === user ? "justify-end" : "justify-start";

			const colorClass = message.user === user ? "bg-gray-300" : "bg-blue-700";

			messages += `
            <article class="flex items-center mb-2 gap-1">
                <figure src="placeholder.jpg" alt="User Avatar" class="w-8 h-8 rounded-full aspect-square mr-2 ${colorClass} text-lg flex justify-center items-center uppercase">${message.user.slice(
				0,
				1
			)}</figure>
                <section class="flex flex-col ${alignmentClass}" >
                    <section class="flex gap-2 justify-items-start items-baseline ">
                        <span class=" text-xs font-semibold">${
													message.user
												}</span>
                    </section>
                    <p class="py-2 px-4 me-2 mt-1 rounded-xl mb-2 ${colorClass}">
                        ${message.message}
                    </p>
                </section>
            </article>
        `;
		});
		divLogs.innerHTML = messages;
	});
});
