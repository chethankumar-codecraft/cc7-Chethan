import assert from "assert";
/**
 * 5. Print N Odd or Even Numbers
Write a function that will print the first n odd or even numbers. The first argument must be the number of elements needed (n), and the second one must indicate if we need 'even' or 'odd'.
function printNumbers(n, evenOrOdd)
Examples:
printNumbers(4, 'odd') // => 1, 3, 5, 7
printNumbers(5, 'even') // => 2, 4, 6, 8, 10
 */

type OddEven = "even" | "odd";

type Print = (n: number, odd_or_even: OddEven) => number[];

const printNumbers: Print = (n, odd_or_even) => {
  const res = [];
  for (let i = 1; i <= n * 2; i++) {
    if (odd_or_even == "even" && i % 2 == 0) res.push(i);
    else if (odd_or_even == "odd" && i % 2 == 1) res.push(i);
  }

  return res;
};

let num = 4;
assert.deepEqual(
  printNumbers(num, "odd"),
  [1, 3, 5, 7],
  "Failed for number 4 odd",
);

num = 5;
assert.deepEqual(
  printNumbers(num, "even"),
  [2, 4, 6, 8, 10],
  "Failed for number 5 even",
);

num = 10;
assert.deepEqual(
  printNumbers(num, "even"),
  [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
  "Failed for number 10 even",
);
