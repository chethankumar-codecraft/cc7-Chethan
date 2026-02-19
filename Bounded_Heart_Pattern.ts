import assert from "assert";
/**
 * 4. Bounded Heart Pattern
Implement this variation where the boundaries have green hearts (💚), and the inner hearts are blue (💙).
💚
💚 💚
💚 💙 💚
💚 💙 💙 💚
💚 💙 💙 💙 💚
💚 💙 💙 💙 💙 💚
💚 💚 💚 💚 💚 💚 💚

 */

function printHeart4(n: number) {
  let res = "";
  if (n < 1) return res;
  for (let i = 1; i <= n; i++) {
    let line = "";
    for (let j = 1; j <= i; j++) {
      if (j == 1 || j == i || i == n) {
        line = line + "💚";
        if (j != i) line += " ";
      } else {
        line = line + "💙";
        if (j != i) line += " ";
      }
    }
    res += line;
    if (i != n) res += "\n";
  }
  console.log(res);
  return res;
}

let num = 7;
assert(
  printHeart4(num) ===
    "💚\n💚 💚\n💚 💙 💚\n💚 💙 💙 💚\n💚 💙 💙 💙 💚\n💚 💙 💙 💙 💙 💚\n💚 💚 💚 💚 💚 💚 💚",
  "Failed for number 7",
);

num = 3;
assert(printHeart4(num) === "💚\n💚 💚\n💚 💚 💚", "Failed for number 3");

num = 2;
assert(printHeart4(num) === "💚\n💚 💚", "Failed for number 2");
