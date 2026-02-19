import assert from "assert";

/**
 * 
 * 9. Add Corresponding Array Elements
Write a function called addArrays that will generate a result array where it contains the sum of corresponding numbers in the source arrays. If arrays are of different lengths, assume missing elements are 0.
function addArrays(a, b)
Examples:
addArrays([2, 3, 5], [5, 6, 4]) // => [7, 9, 9]
addArrays([2, 2], [4, 5, 6]) // => [6, 7, 6]
addArrays([4, 5, 5], []) // => [4, 5, 5]
*
*@param arr1 Array
*@param arr2 Array
*@returns sum of both array elements
* *
 */

function addArrays(arr1: number[], arr2: number[]): number[] {
  let res: number[] = [];

  let i = 0,
    j = 0;
  while (i < arr1.length || j < arr2.length) {
    let sum = 0;
    if (arr1[i] !== undefined) sum += arr1[i]!;
    if (arr2[j] !== undefined) sum += arr2[j]!;
    res.push(sum);
    i++;
    j++;
  }

  return res;
}

assert.deepStrictEqual(
  addArrays([2, 3, 5], [5, 6, 4]),
  [7, 9, 9],
  "Failed case for equal length",
);

assert.deepStrictEqual(
  addArrays([], [1]),
  [1],
  "Failed case of first array is smaller",
);

assert.deepStrictEqual(
  addArrays([4, 5, 5], []),
  [4, 5, 5],
  "Failed for case of first array is larger",
);

assert.deepStrictEqual(
  addArrays([5, -4, 0, 5, 5], [9, 1, 5, 122]),
  [14, -3, 5, 127, 5],
  "Failed for case with different length and negative value",
);

assert.deepStrictEqual(
  addArrays([], []),
  [],
  "Both empty array should return empty array as a result",
);

assert.deepStrictEqual(
  addArrays([], [1, 5]),
  [1, 5],
  "One empty array so result is [1,5]     ",
);
