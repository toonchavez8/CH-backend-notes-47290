// All imports
import chalk from "chalk";
import longestWord from "./longestWord.js";
import isReverseInt from "./isReverseInt.js";

// loading console log
console.log(chalk.yellow("starting ...   "));

console.log(longestWord("Hello my name is John"));

console.log(longestWord("The quick brown fox jumps over the lazy dog"));

console.log(isReverseInt(123, 321)); // true
console.log(isReverseInt(-123, -321)); // true
console.log(isReverseInt(321, 312)); // false
console.log(isReverseInt(-123, 321)); // false
