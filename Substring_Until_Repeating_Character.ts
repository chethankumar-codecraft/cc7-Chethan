import assert from "assert";
/**
 * 8. Substring Until Repeating Character
 * Return a substring containing all characters in a string until you see a character that is repeating. (Hint: Use a loop and break when the repeating character is found. Perform a linear search to check if a character has appeared earlier.)
function getStringSpecial(str)
Examples:
getStringSpecial('a dream that is') // => 'a dre'
getStringSpecial('unparliamentary') // => 'unparli’
 */

function getStringSpecial(str: string): string {
  let res = "";
  outLoop: for (let i = 0; i < str.length; i++) {
    if (str[i] !== " ")
      for (let j = i - 1; j >= 0; j--) {
        if (str[i] === str[j]) break outLoop;
      }
    res += str[i];
  }

  return res;
}

assert(
  getStringSpecial("a dream that is") === "a dre",
  "Failed for case :a dream that is",
);

assert(
  getStringSpecial("unparliamentary") === "unparli",
  "Failed for case : unparliamentary",
);

assert(
  getStringSpecial("  Chethan   Kumar   ") === "  Chet",
  "Failed for case with spaces",
);

assert(getStringSpecial(" ") === " ", "Failed for case with one space");
