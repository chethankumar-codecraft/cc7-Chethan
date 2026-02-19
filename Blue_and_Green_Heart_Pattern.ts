import assert from "assert";
/**
 * 
 * 2. Blue and Green Heart Pattern (Line Parity)
Once you implement Exercise 1, improvise. We want green hearts (💚) in odd lines, and blue hearts (💙) in even lines.

Example for 5 lines:
💚
💙 💙
💚 💚 💚
💙 💙 💙 💙
💚 💚 💚 💚 💚

 */

function printHeart2(n: number) {
  let isGreen = true;
  let res = "";
  if (n < 1) return res;
  for (let i = 1; i <= n; i++) {
    let line = "";
    for (let j = 1; j <= i; j++) {
      if (isGreen) {
        line = line + "💚";
        if (j != i) line += " ";
      } else {
        line = line + "💙";
        if (j != i) line += " ";
      }
    }
    res += line;
    if (i != n) res += "\n";
    isGreen = !isGreen;
  }
  return res;
}

let num = 5;
assert(
  printHeart2(num) == "💚\n💙 💙\n💚 💚 💚\n💙 💙 💙 💙\n💚 💚 💚 💚 💚",
  "Not working for number 5",
);

num = 1;
assert(printHeart2(num) == "💚", "Not working for number 1");

num = 7;
assert(
  printHeart2(num) ==
    "💚\n💙 💙\n💚 💚 💚\n💙 💙 💙 💙\n💚 💚 💚 💚 💚\n💙 💙 💙 💙 💙 💙\n💚 💚 💚 💚 💚 💚 💚",
  "Not working for number 7",
);
