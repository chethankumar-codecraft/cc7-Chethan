import assert from "assert";
/**
 * 7. Convert Decimal to Binary
Convert a given decimal number to its binary format.
function convertToBinary(numInDecimal)
Examples:
convertToBinary(10) // => '1010'
convertToBinary(1000) // => '111101000'
 */

function convertToBinary(num: number): string {
  let res = "";
  while (num > 1) {
    res = (num % 2) + res;
    num = Math.floor(num / 2);
  }
  res = num + res;

  return res;
}

assert(convertToBinary(10) === "1010", "failed for number 10");

assert(convertToBinary(3) === "11", "failed for number 3");

assert(convertToBinary(127) === "1111111", "failed for number 127");

assert(convertToBinary(64) === "1000000", "failed for number 64");
