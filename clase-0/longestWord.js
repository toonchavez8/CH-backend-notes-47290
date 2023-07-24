// this is a function that recived a prop of string
export default function longestWord(string) {
	// Remove special characters from the string
	const cleanString = string.replace(/[^\w\s]/g, "");

	// Split the clean string into an array of words
	const words = cleanString.split(" ");

	// Initialize variables to track the longest word(s)
	let longestLength = 0;
	let longestWords = [];

	// Iterate over each word in the array
	for (const word of words) {
		// Check if the current word is longer than the previous longest word
		if (word.length > longestLength) {
			longestLength = word.length;
			longestWords = [word];
		}
		// Check if the current word has the same length as the longest word found so far
		else if (word.length === longestLength) {
			longestWords.push(word);
		}
	}

	// Check if there is only one longest word
	if (longestWords.length === 1) {
		return longestWords[0]; // Return the single longest word as a string
	} else {
		return longestWords; // Return the array of longest words
	}
}
