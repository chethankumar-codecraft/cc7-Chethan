import assert from "assert";

/**
 * #1.a
Write a Higher Order function(HOF):
function createCutOff(cutOffValue)
This function should return, another function which takes a number as its argument and should return if the number is within cutoff value that it closes over its containing function.
We should be able to say:
const cutOff100 = createCutOff(100)
assert.equal(cutOff100(89), true)
assert.equal(cutOff100(189), false)

 */

function createCutOff(cutOffValue: number): (num: number) => boolean {
  return (num: number) => {
    return num <= cutOffValue;
  };
}
const cutOff100 = createCutOff(100);
assert.equal(
  cutOff100(89),
  true,
  "Should return true when number is less than cutoff",
);
assert.equal(
  cutOff100(189),
  false,
  "Should return false when number is greater than cutoff",
);
assert.equal(cutOff100(100), true, "Return true when both number are equal");

/**
 * 2.We have this array
const strings = ["CraftCode is a nice company", “We love CraftCode”, “We are working in CraftCode”, “Where is CraftCode?”];
We want to transform the above array such that in each item, we re arrange ‘CraftCode’ with ‘CodeCraft’.
So, we need to get the transformed array like so:

 */

const str = [
  "CraftCode is a nice company",
  "We love CraftCode",
  "We are working in CraftCode",
  "Where is CraftCode?",
];

const correctedString = str.map((s) => s.replaceAll("CraftCode", "CodeCraft"));

assert.deepStrictEqual(correctedString, [
  "CodeCraft is a nice company",
  "We love CodeCraft",
  "We are working in CodeCraft",
  "Where is CodeCraft?",
]);

/**
 * 3.We have the following text
const purchases = `items qty
apple 24
mango 50
guava 42
onion 31
water 10`
We need to actually filter out all lines that do not contain 4.  And then for each quantity we want to add 10. So expected output text is
`items qty
mango 60
onion 41
water 20`

 */

const purchases = `items qty
apple 24
mango 50
guava 42
onion 31
water 10`;

const lines = purchases.split("\n");
const linesWithout4 = lines.filter((line) => !line.includes("4"));

const res = linesWithout4.map((str, index) => {
  if (index === 0) return str;
  const [item, quantity] = str.split(" ");
  const num = Number(quantity) + 10;
  return item + " " + num;
});

assert.deepEqual(res, ["items qty", "mango 60", "onion 41", "water 20"]);

/**
 *4. In the array given below, filter out all strings that contain  either ‘u’ or ‘g’.
const items = ['browl', 'faaast', 'energy', 'stand', 'eat', 'lunch']

 */

const items = ["browl", "faaast", "energy", "stand", "eat", "lunch"];

const resultItem = items.filter(
  (str) => str.includes("u") || str.includes("g"),
);

assert.deepStrictEqual(resultItem, ["energy", "lunch"]);

/**
 * #5.
For the given input array, filter all elements that start with mang or end with fy
let items = ['mangalore', 'semangin', '2 lonely', 'verify', 'rectify', 'mangala', 'notifyy']

 */

let items2 = [
  "mangalore",
  "semangin",
  "2 lonely",
  "verify",
  "rectify",
  "mangala",
  "notifyy",
];

let resultItems2 = items2.filter(
  (str) => str.startsWith("mang") || str.endsWith("fy"),
);

assert.deepStrictEqual(resultItems2, [
  "mangalore",
  "verify",
  "rectify",
  "mangala",
]);

//using Regex based check
const mangOrfyPattern = /^mang.*|.*fy$/;
let resultItemRegex = items2.filter((str) => str.match(mangOrfyPattern));

assert.deepStrictEqual(resultItemRegex, [
  "mangalore",
  "verify",
  "rectify",
  "mangala",
]);
/**
 * #6.
We want to add 10 to each number in an array of given numbers, and then filter out those that can be divided by 4.
For example input:
const numbers = [34, 45, 2, 53, 84, 542, 31, 23].
we should get
[44, 12, 552]

 */
const numbers = [34, 45, 2, 53, 84, 542, 31, 23];

const resultnumbers = numbers
  .map((num) => num + 10)
  .filter((num) => num % 4 === 0);

assert.deepStrictEqual(resultnumbers, [44, 12, 552]);

/**
 * #7.
For the given array of indices, we need to return an array containing fibonacci numbers at those indices
For example:
[2, 1, 5,  7] should be transformed into [1, 1, 5, 13]
Fibonacci series: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144
 */

const originalArray = [2, 1, 5, 7];

function fibonacci(num: number) {
  let fib1 = 0;
  let fib2 = 1;
  if (num == 0) return 0;
  if (num == 1) return 1;
  let i = 2;
  while (i <= num) {
    let fib3 = fib1 + fib2;
    fib1 = fib2;
    fib2 = fib3;
    i++;
  }
  return fib2;
}
const fibArray = originalArray.map((num) => fibonacci(num));

assert.deepStrictEqual(fibArray, [1, 1, 5, 13]);

/** 
 * #8.
We want to extract all emails from the following array of strings.  Each string seems to be an address info, which also contains emails. Some addresses might miss the email. We need to ultimately have an array of emails where they are all in lowercase.
For example, for the input array below
["34, brighten street, email: BS@sft.com", "Behind hotel paragon, rode street, micHel@sun.it", "ulef court, cown street, email:cown@street",  "CodeCraft"]
We expect:
["bs@sft.com", "michel@sun.it"]

*/

const addresses = [
  "34, brighten street, email: BS@sft.com",
  "Behind hotel paragon, rode street, micHel@sun.it",
  "ulef court, cown street, email:cown@street",
  "CodeCraft",
];

const emailRegEx = /\b[A-Z0-9.%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;

const emailAddress = addresses
  .map((address) => address.match(emailRegEx)) //gives the object which has email from the array
  .filter((addressWithEmail) => addressWithEmail !== null) //during map if string doesn't have email it return null that as to removed
  .map((a) => a[0].toLowerCase()); //match gives object in that we only need string

assert.deepStrictEqual(emailAddress, ["bs@sft.com", "michel@sun.it"]);

/**
 * #9.
  const people = [
    {
      name: 'John',
      age: 13
    },
    {
      name: 'Mark',
      age: 56,
    },
    {
      name: 'Rachel',
      age: 45,
    },
    {
      name: 'Nate',
      age: 67,
    },
    {
      name: 'Jeniffer',
      age: 65,
    }
  ];
From the above list,  get the list of ages.

 */

const people = [
  {
    name: "John",
    age: 13,
  },
  {
    name: "Mark",
    age: 56,
  },
  {
    name: "Rachel",
    age: 45,
  },
  {
    name: "Nate",
    age: 67,
  },
  {
    name: "Jeniffer",
    age: 65,
  },
];

const ages = people.map((person) => person.age);

assert.deepStrictEqual(ages, [13, 56, 45, 67, 65]);

/**
 * #10.
We have this list of food item ingredients.
const foods = [
{ idli: ['rice', 'urad', 'oil', 'cashew', 'water'] },
{ chapathi: ['atta', 'gluten', 'water', 'oil', 'sugar'] },
{ pizza: ['maida', 'sugar', 'oil', 'chiili', 'flakes', 'sause'] },
{ 'paneer masala': ['paneer', 'onion', 'tomato', 'garlic', 'oil'] },
];
Can you find the food items that do not contain sugar here? // ["idli", "paneer masala"]
Food items that contain both chilli and oil ?  // ["pizza"]
We need to also generate another array, that will have objects where key is the food name, and value will be  ‘safe’  or ‘unsafe’.   Foods that contain sugar are unsafe, rest are safe.  // [{"idli": "safe"}, {"chapathi": "unsafe"}, {"pizza": "unsafe"}, {"paneer masala": "safe"}]

 */

const foods = [
  { idli: ["rice", "urad", "oil", "cashew", "water"] },
  { chapathi: ["atta", "gluten", "water", "oil", "sugar"] },
  { pizza: ["maida", "sugar", "oil", "chilli", "flakes", "sause"] },
  { "paneer masala": ["paneer", "onion", "tomato", "garlic", "oil"] },
];

//food items that do not contain sugar
const noSugar = foods
  .filter((item) => {
    return !Object.values(item)[0]!.includes("sugar");
  })
  .map((item) => Object.keys(item)[0]);

assert.deepStrictEqual(noSugar, ["idli", "paneer masala"]);

//items that contain both chilli and oil
const chilliAndOil = foods
  .filter((item) => {
    return (
      Object.values(item)[0]?.includes("chilli") &&
      Object.values(item)[0]?.includes("oil")
    );
  })
  .map((item) => Object.keys(item)[0]);

assert.deepStrictEqual(chilliAndOil, ["pizza"]);

// objects where key is the food name, and value will be  ‘safe’  or ‘unsafe’
const safeOrUnsafe = foods.map((item) => {
  const food = Object.keys(item)[0];
  return {
    [food!]: noSugar.includes(food!) ? "safe" : "unsafe",
  };
});

assert.deepStrictEqual(safeOrUnsafe, [
  { idli: "safe" },
  { chapathi: "unsafe" },
  { pizza: "unsafe" },
  { "paneer masala": "safe" },
]);

/**
 * #11
Find the second largest number in a given array first by using an imperative approach without using reduce. Use a forEach HOF to iterate over items and figure out the second largest item.
Also give a solution using reduce method. 
 */

//Imperative approach
function secondLargest(arr: number[]): number | undefined {
  if (arr.length < 2) {
    throw new Error("Array must contain at least two numbers");
  }
  let max = -Infinity;
  let secondMax = -Infinity;
  arr.forEach((num) => {
    if (num > max!) {
      if (secondMax! < max!) secondMax = max;
      max = num;
    } else if (num > secondMax! && num < max) secondMax = num;
  });
  return secondMax === -Infinity ? undefined : secondMax;
}

assert.equal(
  secondLargest([5, 67, 23, 100, 23, 99, 23]),
  99,
  "For input [5, 67, 23, 100, 23, 99, 23] result should be 99",
);

assert.throws(
  () => secondLargest([7]),
  /Array must contain at least two numbers/,
);

assert.equal(
  secondLargest([5, 5, 5]),
  undefined,
  "Return undfined bacause all the elements are same",
);

//Using Reduce
function secondLargestReduce(arr: number[]): number | undefined {
  if (arr.length < 2) {
    throw new Error("Array must contain at least two numbers");
  }
  const result = arr.reduce(
    (acc: { max: number; secondMax: number }, cur: number) => {
      if (cur > acc.max) {
        if (acc.secondMax < acc.max) acc.secondMax = acc.max;
        acc.max = cur;
      } else if (cur > acc.secondMax! && cur < acc.max) acc.secondMax = cur;
      return acc;
    },
    { max: -Infinity, secondMax: -Infinity },
  );
  return result.secondMax === -Infinity ? undefined : result.secondMax;
}

assert.equal(
  secondLargestReduce([5, 67, 23, 100, 23, 99, 23]),
  99,
  "For input [5, 67, 23, 100, 23, 99, 23] result should be 99",
);

assert.throws(
  () => secondLargestReduce([7]),
  /Array must contain at least two numbers/,
);

assert.equal(
  secondLargestReduce([5, 5, 5]),
  undefined,
  "Return undfined bacause all the elements are same",
);
