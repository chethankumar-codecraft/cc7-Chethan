import assert from "assert";
/**
 * 
 * 10. Compute String Length (Without .length)
Write a function to compute the length of the string (do not use the built-in string.length property).
function lengthOfString(str)
Example:
lengthOfString('one world') // => 9

 * @param str string
 * @returns length of the string
 */

const segmenter = new Intl.Segmenter(undefined, {
  granularity: "grapheme",
});

function lengthOfString(str: string): number {
  const res = [...segmenter.segment(str)];
  let count = 0;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const val of res) count++;

  return count;
}

assert(lengthOfString("An 😀") === 4, `For input :"An 😀" you should get 4`);

assert(lengthOfString("") === 0, "Failed for case of empty string");

assert(
  lengthOfString("  Chethan  Kumar  ") === 18,
  "Failed for case with more spaces",
);

assert(
  lengthOfString("Codecraft") === 9,
  `For the input "Codecraft" result should be 9`,
);

assert(
  lengthOfString("👩🏽‍🔬🏴󠁧󠁢󠁳󠁣󠁴󠁿Hi") === 4,
  "the user perceived length is 4 for 👩🏽‍🔬🏴󠁧󠁢󠁳󠁣󠁴󠁿Hi",
);
