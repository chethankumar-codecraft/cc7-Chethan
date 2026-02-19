import assert from "assert";
/**
 *6. Pad Zeros Before a Number
Write a function that will pad zeros before a number to ensure it has a specified number of digits. If the provided number already contains more than the required digits, simply return the number string as is.
function padZerosBeforeNumber(number, numOfDigits)
Examples:
padZerosBeforeNumber(233, 6) // => '000233'
padZerosBeforeNumber(333333445, 4) // => '333333445'
 */

function padZerosBeforeNumber(num: number, numOfDigits: number) {
  let str = String(num);
  if (str.length >= numOfDigits) return str;

  while (str.length < numOfDigits) str = "0" + str;

  return str;
}

assert(
  padZerosBeforeNumber(233, 6) === "000233",
  "Failed for number 233 with 6 length",
);

assert(
  padZerosBeforeNumber(333333445, 4) === "333333445",
  "Failed for number 333333445 with 4 length",
);

assert(
  padZerosBeforeNumber(5, 3) === "005",
  "Failed for number 5 with 3 length",
);
