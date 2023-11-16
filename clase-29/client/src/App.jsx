import { useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
	const [input, setInput] = useState({
		first_name: "",
		last_name: "",
		email: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setInput({ ...input, [name]: value });
	};

	const handleSumit = async (e) => {
		e.preventDefault();
		console.log(input);

		try {
			await axios("http://localhost:4321/users", {
				method: "POST",
				data: JSON.stringify(input),
				headers: {
					"Content-Type": "application/json",
				},
			});

			// Clear the input fields
			setInput({
				first_name: "",
				last_name: "",
				email: "",
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<header>Test</header>
			<main>
				<section>
					<h1>Register New User</h1>
					<form onSubmit={handleSumit}>
						<label htmlFor="first_name">First Name</label>
						<input
							type="text"
							name="first_name"
							id="first_name"
							onChange={handleInputChange}
						/>
						<label htmlFor="last_name">Last Name</label>
						<input
							type="text"
							name="last_name"
							id="last_name"
							onChange={handleInputChange}
						/>
						<label htmlFor="email">Email</label>
						<input
							type="email"
							name="email"
							id="email"
							onChange={handleInputChange}
						/>
						<button type="submit">Submit</button>
					</form>
				</section>
			</main>
			<footer>Footer</footer>
		</>
	);
}

export default App;
