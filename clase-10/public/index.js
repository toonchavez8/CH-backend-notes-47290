const socketClient = io();

let chatBox = document.getElementById("chatBox");
let submitBtn = document.getElementById("submitBtn");
let history = document.getElementById("history");
let clientID = document.getElementById("clientID");

// Event Listner para el enter
chatBox.addEventListener("keyup", (event) => {
	// aqui quitamos cualquier excesso de espacios en el mensaje
	const message = chatBox.value.trim();

	// si el enter fue ingresado y el mensaje no esta vasillo lo enviamos
	if (event.key === "Enter" && !message == "") {
		socketClient.emit("message", chatBox.value);
		chatBox.value = "";
	}
});

// en el boton hacemos lo mismo
submitBtn.addEventListener("click", (event) => {
	event.preventDefault();

	// Trim whitespace from the input
	const message = chatBox.value.trim();

	if (message !== "") {
		socketClient.emit("message", message);
		chatBox.value = "";
	}
});

// Aqui en cada ves que se modifique el historial que es en cuanto carga el chat, se renderean todos los mensajes que es una funcion
socketClient.on("history", (data) => {
	displayMessages(data);
});

// aqui cuando el cliente detecte que el server mando mensaje se hace un render denuevo actualizando en tiempo real
socketClient.on("message", (data) => {
	displayMessages(data);
	history.scrollTop = history.scrollHeight; // Scroll to the bottom
});

// aqui solo es un for each con condicionales para visualizar el chat mas bonito
function displayMessages(data) {
	let messages = "";
	const currentUserId = socketClient.id; // Replace with the actual current user's ID
	const currentTime = new Date();
	clientID.innerHTML = `Client id: ${currentUserId}`;
	data.forEach((message) => {
		console.log(message);
		const userId = message.userId;
		console.log(userId);
		const lastThreeChars = userId.slice(-3); // Get the last 3 characters of the userid
		console.log("last3Chars", lastThreeChars);
		// Determine the alignment based on the current user
		const alignmentClass =
			userId === currentUserId ? "flex-row-reverse" : "justify-start";

		const colorClass =
			userId === currentUserId
				? "bg-blue-700 text-gray-100"
				: "bg-gray-300 text-black ";

		// Convert the message timestamp to a Date object
		const messageTime = new Date(message.timestamp);

		// Calculate the time difference in seconds
		const timeDiffInSeconds = Math.floor((currentTime - messageTime) / 1000);

		// Determine the time string to display
		let timeString = "";
		if (timeDiffInSeconds < 60) {
			timeString = "just now";
		} else if (timeDiffInSeconds < 3600) {
			// Less than an hour
			const minutesAgo = Math.floor(timeDiffInSeconds / 60);
			timeString = `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`;
		} else if (timeDiffInSeconds < 86400) {
			// Less than a day
			const hoursAgo = Math.floor(timeDiffInSeconds / 3600);
			timeString = `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`;
		} else {
			const daysAgo = Math.floor(timeDiffInSeconds / 86400);
			timeString = `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`;
		}

		messages += `
            <article class="flex items-center mb-2 gap-1 ${alignmentClass}">
                <figure src="placeholder.jpg" alt="User Avatar" class="w-8 h-8 rounded-full aspect-square mr-2 ${colorClass} text-lg flex justify-center items-center uppercase">${lastThreeChars.slice(
			-1
		)}</figure>
                <section class="flex flex-col ${alignmentClass}" >
                    <section class="flex gap-2 justify-items-start items-baseline ">
                        <span class=" text-xs font-semibold">${lastThreeChars}</span>
                        <span class="text-xs text-gray-500">${timeString}</span>
                    </section>
                    <p class="py-2 px-4 me-2 mt-1 rounded-xl mb-2 ${colorClass}">
                        ${message.message}
                    </p>
                </section>
            </article>
        `;
	});

	history.innerHTML = messages;
}
