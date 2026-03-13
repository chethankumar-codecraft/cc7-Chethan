import assert from "assert";
import movies from "./movies.json" with { type: "json" };
/**
 * #16.
Generate an array that contains first n natural numbers.  Then get us an object, that contains two keys, ‘odd’, and ‘even’.  Each of these keys will have values as  arrays of odd numbers and even numbers respectively.  How do you transform this result such that keys remain same, but values will be sums of odd numbers and even numbers?

 */

function naturalNumbers(n: number) {
  const res = [];
  for (let i = 1; i <= n; i++) res.push(i);
  return res;
}
function oddAndEven(n: number) {
  return naturalNumbers(n).reduce(
    (acc: { even: number[]; odd: number[] }, cur) => {
      if (cur % 2 === 0) acc.even.push(cur);
      else acc.odd.push(cur);
      return acc;
    },
    { even: [], odd: [] },
  );
}

function sumOfOddEven(n: number) {
  return Object.entries(oddAndEven(n)).reduce(
    (acc, curr) => {
      acc[curr[0] as "even" | "odd"] = curr[1].reduce(
        (acc, curr) => acc + curr,
        0,
      );
      return acc;
    },
    { even: 0, odd: 0 },
  );
}

assert.deepStrictEqual(sumOfOddEven(10), { even: 30, odd: 25 });

/**
 * #17.
Generate an array containing alphabets. Then produce an object that contain two keys, ‘vowels’ and 'consonants'. The values will be array of alphabets representing vowels and consonants.

 */

function alphabetArray() {
  const array = [];
  for (let i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++)
    array.push(String.fromCharCode(i));

  for (let i = "a".charCodeAt(0); i <= "z".charCodeAt(0); i++)
    array.push(String.fromCharCode(i));

  return array;
}

const vowelsAndConsonants = alphabetArray().reduce(
  (acc: { vowels: string[]; consonants: string[] }, cur) => {
    if ("aeiouAEIOU".includes(cur)) acc["vowels"].push(cur);
    else acc["consonants"].push(cur);
    return acc;
  },
  { vowels: [], consonants: [] },
);

assert.deepStrictEqual(vowelsAndConsonants, {
  vowels: ["A", "E", "I", "O", "U", "a", "e", "i", "o", "u"],
  consonants: [
    "B",
    "C",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "M",
    "N",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "b",
    "c",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "m",
    "n",
    "p",
    "q",
    "r",
    "s",
    "t",
    "v",
    "w",
    "x",
    "y",
    "z",
  ],
});

/**
 * #18.
Here is a movies data that has information about movies .
You need to embed this json in your program and load it and have the data in a variable for your use.  Write the following functions:
1.Get the array of all actor names  (cast) that are seen in the movies data.
2.Get an object with keys being year and values  being the array of names of movies released in the given year (consider only 3 at max). The format should be something like this:
{
    "2017": ["The Lego Batman Movie",  "Fifty Shades Darker", "John Wick: Chapter 2"],    // 3 movie names at max for each year
    "2018": [ …. ], 
    ….
}

 */

const movies2 = [
  {
    title: "The Book of Love",
    year: 2017,
    cast: [
      "Jason Sudeikis",
      "Jessica Biel",
      "Maisie Williams",
      "Mary Steenburgen",
      "Orlando Jones",
      "Paul Reiser",
    ],
    genres: ["Drama", "Comedy"],
  },
  {
    title: "Split",
    year: 2017,
    cast: [
      "James McAvoy",
      "Anya Taylor-Joy",
      "Betty Buckley",
      "Jessica Sula",
      "Haley Lu Richardson",
      "Kim Director",
      "Lyne Renée",
      "Brad William Henke",
      "Neal Huff",
      "Sebastian Arcelus",
    ],
    genres: ["Horror", "Thriller", "Drama"],
  },
  {
    title: "xXx: Return of Xander Cage",
    year: 2017,
    cast: [
      "Vin Diesel",
      "Samuel L. Jackson",
      "Donnie Yen",
      "Deepika Padukone",
      "Kris Wu",
      "Nina Dobrev",
      "Tony Jaa",
      "Ruby Rose",
      "Toni Collette",
      "Nicky Jam",
      "Rory McCann",
      "Al Sapienza",
      "Michael Bisping",
      "Ariadna Gutiérrez",
      "Hermione Corfield",
    ],
    genres: ["Action", "Adventure"],
  },
  {
    title: "The Resurrection of Gavin Stone",
    year: 2017,
    cast: [
      "Brett Dalton",
      "Anjelah Johnson",
      "Neil Flynn",
      "Shawn Michaels",
      "D. B. Sweeney",
    ],
    genres: ["Comedy", "Drama"],
  },
  {
    title: "Trespass Against Us",
    year: 2017,
    cast: [
      "Michael Fassbender",
      "Brendan Gleeson",
      "Lyndsey Marshal",
      "Killian Scott",
    ],
    genres: ["Crime", "Drama", "Thriller"],
  },
  {
    title: "Sophie and the Rising Sun",
    year: 2017,
    cast: [
      "Julianne Nicholson",
      "Margo Martindale",
      "Lorraine Toussaint",
      "Takashi Yamaguchi",
      "Diane Ladd",
    ],
    genres: ["Drama", "Romance"],
  },
  {
    title: "A Dog's Purpose",
    year: 2017,
    cast: [
      "Britt Robertson",
      "Dennis Quaid",
      "Josh Gad",
      "Peggy Lipton",
      "Juliet Rylance",
    ],
    genres: ["Family"],
  },
  {
    title: "The Meg",
    year: 2018,
    cast: [
      "Jason Statham",
      "Li Bingbing",
      "Rainn Wilson",
      "Ruby Rose",
      "Winston Chao",
      "Cliff Curtis",
    ],
    genres: ["Action", "Horror", "Thriller", "Science Fiction"],
  },
];
//1.Get the array of all actor names  (cast) that are seen in the movies data.
const allActors1 = movies.reduce((acc: string[], cur) => {
  cur.cast.forEach((actor) => {
    if (!acc.includes(actor)) acc.push(actor);
  });
  return acc;
}, []);
assert.deepStrictEqual(allActors1.splice(0, 10), [
  "Jason Sudeikis",
  "Jessica Biel",
  "Maisie Williams",
  "Mary Steenburgen",
  "Orlando Jones",
  "Paul Reiser",
  "James McAvoy",
  "Anya Taylor-Joy",
  "Betty Buckley",
  "Jessica Sula",
]);
const allActors = movies2.reduce((acc: string[], cur) => {
  cur.cast.forEach((actor) => {
    if (!acc.includes(actor)) acc.push(actor);
  });
  return acc;
}, []);

assert.deepStrictEqual(allActors, [
  "Jason Sudeikis",
  "Jessica Biel",
  "Maisie Williams",
  "Mary Steenburgen",
  "Orlando Jones",
  "Paul Reiser",
  "James McAvoy",
  "Anya Taylor-Joy",
  "Betty Buckley",
  "Jessica Sula",
  "Haley Lu Richardson",
  "Kim Director",
  "Lyne Renée",
  "Brad William Henke",
  "Neal Huff",
  "Sebastian Arcelus",
  "Vin Diesel",
  "Samuel L. Jackson",
  "Donnie Yen",
  "Deepika Padukone",
  "Kris Wu",
  "Nina Dobrev",
  "Tony Jaa",
  "Ruby Rose",
  "Toni Collette",
  "Nicky Jam",
  "Rory McCann",
  "Al Sapienza",
  "Michael Bisping",
  "Ariadna Gutiérrez",
  "Hermione Corfield",
  "Brett Dalton",
  "Anjelah Johnson",
  "Neil Flynn",
  "Shawn Michaels",
  "D. B. Sweeney",
  "Michael Fassbender",
  "Brendan Gleeson",
  "Lyndsey Marshal",
  "Killian Scott",
  "Julianne Nicholson",
  "Margo Martindale",
  "Lorraine Toussaint",
  "Takashi Yamaguchi",
  "Diane Ladd",
  "Britt Robertson",
  "Dennis Quaid",
  "Josh Gad",
  "Peggy Lipton",
  "Juliet Rylance",
  "Jason Statham",
  "Li Bingbing",
  "Rainn Wilson",
  "Winston Chao",
  "Cliff Curtis",
]);

/**2.Get an object with keys being year and values  being the array of names of movies released in the given year (consider only 3 at max). The format should be something like this {
    "2017": ["The Lego Batman Movie",  "Fifty Shades Darker", "John Wick: Chapter 2"],    // 3 movie names at max for each year
    "2018": [ …. ], 
    ….
}
    */

const moviesAndYear = movies2.reduce((acc: Record<number, string[]>, cur) => {
  if (acc[cur.year] === undefined) acc[cur.year] = [cur.title];
  else if (acc[cur.year]!.length < 3) acc[cur.year]!.push(cur.title);
  return acc;
}, {});

assert.deepStrictEqual(moviesAndYear, {
  "2017": ["The Book of Love", "Split", "xXx: Return of Xander Cage"],
  "2018": ["The Meg"],
});

/**
 * #19.
Write the following string manipulation functions
trimLeading(str) Trims a string such that all leading whitespaces are removed.
trimTrailing(str) this will trim whitespaces at the end of the string.
should convert the given string to lowercase
appends a cat emojee
Use compose or pipe mechanism to come up with a function  trim,  that composes the above functions.  Test it with some inputs.

 */

type Func = (str: string) => string;
const pipe = (...funcs: Func[]): Func => {
  return (x: string) => {
    return funcs.reduce((acc, cur) => cur(acc), x);
  };
};

//trim left
const trimLeft = (str: string) => str.trimStart();
//trim right
const trimRight = (str: string) => str.trimEnd();
//lowercase
const toLower = (str: string) => str.toLowerCase();
//catEmoj
const Emojee = (emojee: string) => (str: string) => str + emojee;

const stringResult = pipe(trimLeft, trimRight, toLower, Emojee("😸"));

assert.equal(stringResult("  Hii i'm   "), "hii i'm😸");

/**
 * #20.
Implement map and filter using reduce. 


const map = <T, U>(array:T[], transform: (item: T) => T):U[T] => { 
    // use array.reduce to implement the map functionality
}

const filter = <T> (array:T[], predicate:(item:T) => boolean): T[] =>{
    // use array.reduce to implement filter functionality
}

 */

const map = <T, U>(array: T[], transform: (item: T) => U): U[] => {
  return array.reduce((acc: U[], cur) => {
    acc.push(transform(cur));
    return acc;
  }, []);
};

assert.deepStrictEqual(
  map(["Chethan", "Codecraft", "Mangalore"], (str: string) => str.length),
  [7, 9, 9],
);
assert.deepStrictEqual(
  map([1, 2, 3, 4, 5], (num: number) => num * num),
  [1, 4, 9, 16, 25],
);

const filter = <T>(array: T[], predicate: (item: T) => boolean): T[] => {
  return array.reduce((acc: T[], cur) => {
    if (predicate(cur)) acc.push(cur);
    return acc;
  }, []);
};

assert.deepStrictEqual(
  filter([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (num: number) => num % 2 == 0),
  [2, 4, 6, 8, 10],
);

assert.deepStrictEqual(
  filter(["CodeCraft", "CodeProof", "leetCode", "CodeChef"], (str: string) =>
    str.startsWith("Code"),
  ),
  ["CodeCraft", "CodeProof", "CodeChef"],
);
