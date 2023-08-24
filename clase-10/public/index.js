const socketClient = io();

let chatBox = document.getElementById("chatBox");
let submitBtn = document.getElementById("submitBtn");
let history = document.getElementById("history");
let clientID = document.getElementById("clientID");
let log = []; // Initialize the log array

// event lisner for chatbox and clear message on send
chatBox.addEventListener("keyup", (event) => {
	// check if chatbox value has any whitespaces and will remove excess spaces
	const message = chatBox.value.trim();

	// if enter is pressed and message is not empty it will send message
	if (event.key === "Enter" && !message == "") {
		socketClient.emit("message", chatBox.value);
		chatBox.value = "";
	}
});

// button event lisnter to allow button to be used to send message
submitBtn.addEventListener("click", (event) => {
	event.preventDefault();

	// Trim whitespace from the input
	const message = chatBox.value.trim();

	if (message !== "") {
		socketClient.emit("message", message);
		chatBox.value = "";
	}
});

socketClient.on("history", (data) => {
	log = data; // Update the log with the chat history
	displayMessages(log); // Display the chat history with timestamps
});

socketClient.on("message", (data) => {
	log.push(data); // Add the new message to the log
	displayMessages(log); // Display the updated chat history with timestamps
	history.scrollTop = history.scrollHeight; // Scroll to the bottom
});

function displayMessages(data) {
	let messages = "";
	const currentUserId = socketClient.id; // Replace with the actual current user's ID
	const currentTime = new Date();
	clientID.innerHTML = `Client id: ${currentUserId}`;
	data.forEach((message) => {
		const userId = message.userId;
		const lastThreeChars = userId.slice(-3); // Get the last 3 characters of the userid

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
