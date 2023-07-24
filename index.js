// All imports
import chalk from "chalk";
import longestWord from "./clase-0/isReverseInt";
import isReverseInt from "./clase-0/isReverseInt.js";

// loading console log
console.log(chalk.yellow("starting ...   "));

console.log(longestWord("Hello my name is John"));

console.log(longestWord("The quick brown fox jumps over the lazy dog"));

console.log(isReverseInt(123, 321)); // true
console.log(isReverseInt(-123, -321)); // true
console.log(isReverseInt(123, 123)); // false
console.log(isReverseInt(-123, 321)); // false
