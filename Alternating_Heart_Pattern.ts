import assert from "assert";
/**
 * 3. Alternating Heart Pattern
Implement this variation:
💚
💚 💙
💚 💙 💚
💚 💙 💚 💙
💚 💙 💚 💙 💚
💚 💙 💚 💙 💚 💙

 */

function printHeart3(n: number) {
  let res = "";
  if (n < 1) return res;
  for (let i = 1; i <= n; i++) {
    let isGreen = true;
    let line = "";
    for (let j = 1; j <= i; j++) {
      if (isGreen) {
        line = line + "💚";
        if (j != i) line += " ";
      } else {
        line = line + "💙";
        if (j != i) line += " ";
      }
      isGreen = !isGreen;
    }
    res += line;
    if (i != n) res += "\n";
  }

  return res;
}

let num = 6;
assert(
  printHeart3(num) ===
    "💚\n💚 💙\n💚 💙 💚\n💚 💙 💚 💙\n💚 💙 💚 💙 💚\n💚 💙 💚 💙 💚 💙",
  "Not passed for number 6",
);

num = 2;
assert(printHeart3(num) === "💚\n💚 💙", "Not passed for number 2");

num = -3;
assert(printHeart3(num) === "", "Not passed for negative number");

num = 0;
assert(printHeart3(num) === "", "0 should return empty string");
