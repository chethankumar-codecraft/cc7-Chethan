import assert from "assert";

/**
 * 11. First N Perfect Squares
Write a function to return the first n perfect squares.
generateFirstSquares(n)
Example:
generateFirstSquares(4) // returns [1, 4, 9, 16]

 * 
 * 
 * @param n number
 * @returns first n square numbers array
 * 
 * 
 */

function generateFirstSquares(n: number): number[] {
  const res: number[] = [];
  if (n < 1) return res;
  for (let i = 1; i <= n; i++) res.push(i * i);

  return res;
}

assert.deepStrictEqual(
  generateFirstSquares(20),
  [
    1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289,
    324, 361, 400,
  ],
  "Failed for large value 20",
);

assert.deepStrictEqual(
  generateFirstSquares(4),
  [1, 4, 9, 16],
  "Failed for case 4",
);

assert.deepStrictEqual(
  generateFirstSquares(10),
  [1, 4, 9, 16, 25, 36, 49, 64, 81, 100],
  "Failed for case 10",
);

assert.deepStrictEqual(generateFirstSquares(0), [], "Failed for case 0");
