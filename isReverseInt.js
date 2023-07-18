export default function isReverseInt(num1, num2) {
	const reversedNum1 = parseInt(
		Math.abs(num1).toString().split("").reverse().join(""),
		10
	);
	const reversedNum2 = parseInt(
		Math.abs(num2).toString().split("").reverse().join(""),
		10
	);

	if (num1 >= 0 && num2 >= 0) {
		return num1 === reversedNum2 && num2 === reversedNum1;
	} else if (num1 < 0 && num2 < 0) {
		return num1 === -reversedNum2 && num2 === -reversedNum1;
	}

	return false;
}
