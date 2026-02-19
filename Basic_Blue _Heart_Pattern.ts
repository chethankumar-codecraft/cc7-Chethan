import assert from "assert";
/**
 * 1. Basic Blue Heart Pattern
Write a function that would print the 💙 symbol in the following pattern for a given number of lines (e.g., 8 lines):
💙
💙 💙
💙 💙 💙
💙 💙 💙 💙
💙 💙 💙 💙 💙
💙 💙 💙 💙 💙 💙
💙 💙 💙 💙 💙 💙 💙
💙 💙 💙 💙 💙 💙 💙 💙

 */

function printHeart1(n: number) {
  let res = "";
  if (n < 1) return res;
  for (let i = 1; i <= n; i++) {
    let line = "";
    for (let j = 1; j <= i; j++) {
      line = line + "💙";
      if (j != i) line += " ";
    }
    res += line;
    if (i != n) res += "\n";
  }
  return res;
}

let num = 8;
assert(
  printHeart1(num) ===
    "💙\n💙 💙\n💙 💙 💙\n💙 💙 💙 💙\n💙 💙 💙 💙 💙\n💙 💙 💙 💙 💙 💙\n💙 💙 💙 💙 💙 💙 💙\n💙 💙 💙 💙 💙 💙 💙 💙",
  "Not working for number 8",
);

num = 1;
assert(printHeart1(num) === "💙", "not working for number 1");

num = 0;
assert(printHeart1(num) === "", "Not working for number 0");

num = 4;
assert(
  printHeart1(num) === "💙\n💙 💙\n💙 💙 💙\n💙 💙 💙 💙",
  "Not working for number 4",
);
