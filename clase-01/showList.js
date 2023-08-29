// import chalk

import chalk from "chalk";

// want to create a function calld show list that recives an array
function showList(array) {
	// if array is empty return empty list with chalk
	if (array == null || array == undefined || array == "") {
		return console.log(chalk.red("The array is empty"));
	} else {
		array.forEach((element, index) => {
			console.log(chalk.green(`Element ${index + 1}:`, element));
		});
	}
	// if array has elements then return each element forom the array as a console log.
}
//tests
showList(["a", "b", "c"]);

showList(null);

showList([]);
