export default function isReverseInt(num1, num2) {
	console.log(num1, num2);
	// first we convert the number into strings
	let num1Str = num1.toString();
	let num2Str = num2.toString();

	console.log(num1Str, num2Str);
	//then we split the strings

	num1Str = num1Str.split("");
	num2Str = num2Str.split("");
	console.log(num1Str, num2Str);
	//we then  reverse the string
	num1Str = num1Str.reverse();
	num2Str = num2Str.reverse();
	console.log(num1Str, num2Str);

	// then we join them back together

	num1Str = num1Str.join("");
	num2Str = num2Str.join("");
	console.log(num1Str, num2Str);

	// then we convert them back to numbers
	num1Str = parseInt(num1Str);
	num2Str = parseInt(num2Str);
	console.log(num1Str, num2Str);

	// then we check if the reversed number matches the second number
	return num1Str === num2;
}
