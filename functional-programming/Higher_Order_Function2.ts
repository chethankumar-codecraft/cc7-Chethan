import assert from "assert";
/**
     * #12
Implement a method called as   some  that takes the array as its first argument, and a predicate as its second argument.  Predicate is a function that takes an item in the array as its argument, and returns a boolean.  some function will return true if at-least one item in the array passes the predicate, otherwise will return false. Give an imperative solution, and then give a solution using reduce.
function some(items, predicate)

     */

//Impersive solution
function some<T>(items: T[], predicate: (val: T) => boolean) {
  for (let val of items) {
    if (predicate(val)) return true;
  }
  return false;
}

//check any element in the array is divisible by 5
assert.equal(
  some([2, 4, 6, 3, 10], (num) => num % 5 == 0),
  true,
);

//check is there any string named "Chethan" in the array
assert.equal(
  some(
    ["Codecraft", "Ramesh", "Chethan", "Mangalore"],
    (name) => name === "Chethan",
  ),
  true,
);

assert.equal(
  some(
    ["Codecraft", "Ramesh", "Mysore", "Mangalore"],
    (name) => name === "Chethan",
  ),
  false,
);

//Using Reduce

function someReduce<T>(arr: T[], predicate: (val: T) => boolean): boolean {
  return arr.reduce((acc: boolean, cur: T) => {
    return acc || predicate(cur);
  }, false);
}

assert.equal(
  someReduce([2, 4, 6, 3, 10], (num) => num % 5 == 0),
  true,
);

assert.equal(
  someReduce(
    ["Codecraft", "Ramesh", "Chethan", "Mangalore"],
    (name) => name === "Chethan",
  ),
  true,
);

assert.equal(
  someReduce(
    ["Codecraft", "Ramesh", "Mysore", "Mangalore"],
    (name) => name === "Chethan",
  ),
  false,
);

/**
 * #13
We have an array of quote objects like so:
[
  {
    "text": "Genius is one percent inspiration and ninety-nine percent perspiration.",
    "author": "Thomas Edison"
  },
  {
    "text": "You can observe a lot just by watching.",
    "author": "Yogi Berra"
  },
  {
    "text": "To invent, you need a good imagination and a pile of junk",
    "author": "Thomas Edison"
  },
  {
    "text": "Difficulties increase the nearer we get to the goal.",
    "author": "Yogi Berra"
  },
  {
    "text": "Fate is in your hands and no one elses",
    "author": "Byron Pulsifer"
  },
  {
    "text": "Be the chief but never the lord.",
    "author": "Lao Tzu"
  },
  {
    "text": "Nothing happens unless first we dream.",
    "author": "Byron Pulsifer"
  },
  {
    "text": "Well begun is half done.",
    "author": "Aristotle"
  },
  {
    "text": "Life is a learning experience, only if you learn.",
    "author": "Yogi Berra"
  },
  {
    "text": "Self-complacency is fatal to progress.",
    "author": "Margaret Sangster"
  },
  {
    "text": "Peace comes from within. Do not seek it without.",
    "author": "Buddha"
  },
  {
    "text": "What you give is what you get.",
    "author": "Byron Pulsifer"
  },
  {
    "text": "We can only learn to love by loving.",
    "author": "Lao Tzu"
  },
  {
    "text": "Life is change. Growth is optional. Choose wisely.",
    "author": "Karen Clark"
  },
  {
    "text": "You'll see it when you believe it.",
    "author": "Buddha"
  },
1. We want to get an object that will have keys as author names, and values will be an array of their quotes.  The sample output will look something like this:
{
 "Buddha": ["Peace comes from within. Do not seek it without", "You'll see it when you believe it."]
 // ... other authors to follow similary here...
}
2. A function getQuotesContainingWord(word). that will return an array of quotes (not the quote objects)  that contain the specified word.
3. Get the array of quote strings
4. Array of all authors by removing any duplicates using reduce.

 */
const quoteArray = [
  {
    text: "Genius is one percent inspiration and ninety-nine percent perspiration.",
    author: "Thomas Edison",
  },
  {
    text: "You can observe a lot just by watching.",
    author: "Yogi Berra",
  },
  {
    text: "To invent, you need a good imagination and a pile of junk",
    author: "Thomas Edison",
  },
  {
    text: "Difficulties increase the nearer we get to the goal.",
    author: "Yogi Berra",
  },
  {
    text: "Fate is in your hands and no one elses",
    author: "Byron Pulsifer",
  },
  {
    text: "Be the chief but never the lord.",
    author: "Lao Tzu",
  },
  {
    text: "Nothing happens unless first we dream.",
    author: "Byron Pulsifer",
  },
  {
    text: "Well begun is half done.",
    author: "Aristotle",
  },
  {
    text: "Life is a learning experience, only if you learn.",
    author: "Yogi Berra",
  },
  {
    text: "Self-complacency is fatal to progress.",
    author: "Margaret Sangster",
  },
  {
    text: "Peace comes from within. Do not seek it without.",
    author: "Buddha",
  },
  {
    text: "What you give is what you get.",
    author: "Byron Pulsifer",
  },
  {
    text: "We can only learn to love by loving.",
    author: "Lao Tzu",
  },
  {
    text: "Life is change. Growth is optional. Choose wisely.",
    author: "Karen Clark",
  },
  {
    text: "You'll see it when you believe it.",
    author: "Buddha",
  },
];
//We want to get an object that will have keys as author names, and values will be an array of their quotes.
const authorAndQuotes = quoteArray.reduce(
  (acc: { [key: string]: string[] }, cur: { text: string; author: string }) => {
    if (acc[cur.author] === undefined) acc[cur.author] = [cur.text];
    else acc[cur.author]?.push(cur.text);
    return acc;
  },
  {},
);

assert.deepStrictEqual(authorAndQuotes, {
  "Thomas Edison": [
    "Genius is one percent inspiration and ninety-nine percent perspiration.",
    "To invent, you need a good imagination and a pile of junk",
  ],
  "Yogi Berra": [
    "You can observe a lot just by watching.",
    "Difficulties increase the nearer we get to the goal.",
    "Life is a learning experience, only if you learn.",
  ],
  "Byron Pulsifer": [
    "Fate is in your hands and no one elses",
    "Nothing happens unless first we dream.",
    "What you give is what you get.",
  ],
  "Lao Tzu": [
    "Be the chief but never the lord.",
    "We can only learn to love by loving.",
  ],
  Aristotle: ["Well begun is half done."],
  "Margaret Sangster": ["Self-complacency is fatal to progress."],
  Buddha: [
    "Peace comes from within. Do not seek it without.",
    "You'll see it when you believe it.",
  ],
  "Karen Clark": ["Life is change. Growth is optional. Choose wisely."],
});

//2.A function getQuotesContainingWord(word). that will return an array of quotes (not the quote objects)  that contain the specified word.

function getQuotesContainingWord(word: string) {
  const wordRegExp = new RegExp(`\\b${word}\\b`, "i"); //need the regex of the word
  return quoteArray
    .filter((details) => details.text.match(wordRegExp))
    .map((obj) => obj.text);
}
assert.deepStrictEqual(getQuotesContainingWord("Life"), [
  "Life is a learning experience, only if you learn.",
  "Life is change. Growth is optional. Choose wisely.",
]);

assert.deepStrictEqual(getQuotesContainingWord("learn"), [
  "Life is a learning experience, only if you learn.",
  "We can only learn to love by loving.",
]);

//3. Get the array of quote strings

const quoteList = quoteArray.map((details) => details.text);

assert.deepStrictEqual(quoteList, [
  "Genius is one percent inspiration and ninety-nine percent perspiration.",
  "You can observe a lot just by watching.",
  "To invent, you need a good imagination and a pile of junk",
  "Difficulties increase the nearer we get to the goal.",
  "Fate is in your hands and no one elses",
  "Be the chief but never the lord.",
  "Nothing happens unless first we dream.",
  "Well begun is half done.",
  "Life is a learning experience, only if you learn.",
  "Self-complacency is fatal to progress.",
  "Peace comes from within. Do not seek it without.",
  "What you give is what you get.",
  "We can only learn to love by loving.",
  "Life is change. Growth is optional. Choose wisely.",
  "You'll see it when you believe it.",
]);

//4. Array of all authors by removing any duplicates using reduce.

const authorsList = quoteArray.reduce((acc: string[], cur) => {
  if (!acc.includes(cur.author)) acc.push(cur.author);
  return acc;
}, []);

assert.deepStrictEqual(authorsList, [
  "Thomas Edison",
  "Yogi Berra",
  "Byron Pulsifer",
  "Lao Tzu",
  "Aristotle",
  "Margaret Sangster",
  "Buddha",
  "Karen Clark",
]);

/**
 * #14
Here is an array of employees:
[
{
"firstName": "Molly",
"lastName": "Rojas",
"age": 38,
"email": "mollyrojas@plasmox.com",
"salary": 3065
},
{
"firstName": "Marguerite",
"lastName": "Santiago",
"age": 27,
"email": "margueritesantiago@plasmox.com",
"salary": 2796
},
{
"firstName": "Evelyn",
"lastName": "Oneil",
"age": 26,
"email": "evelynoneil@plasmox.com",
"salary": 3947
},
{
"firstName": "Consuelo",
"lastName": "Case",
"age": 23,
"email": "consuelocase@plasmox.com",
"salary": 2819
},
{
"firstName": "Earline",
"lastName": "Bush",
"age": 29,
"email": "earlinebush@plasmox.com",
"salary": 3494
},
{
"firstName": "Sanford",
"lastName": "Hurley",
"age": 26,
"email": "sanfordhurley@plasmox.com",
"salary": 3068
},
{
"firstName": "Todd",
"lastName": "Gomez",
"age": 33,
"email": "toddgomez@plasmox.com",
"salary": 3906
}
]

1.We want to find the total salary paid for employees whose age is less than 30.
2.Get the array of full-names of all employees. Full name is made up from first name and last name.
3.Get a string that contains all email ids separated by comma.

 */

const employees = [
  {
    firstName: "Molly",
    lastName: "Rojas",
    age: 38,
    email: "mollyrojas@plasmox.com",
    salary: 3065,
  },
  {
    firstName: "Marguerite",
    lastName: "Santiago",
    age: 27,
    email: "margueritesantiago@plasmox.com",
    salary: 2796,
  },
  {
    firstName: "Evelyn",
    lastName: "Oneil",
    age: 26,
    email: "evelynoneil@plasmox.com",
    salary: 3947,
  },
  {
    firstName: "Consuelo",
    lastName: "Case",
    age: 23,
    email: "consuelocase@plasmox.com",
    salary: 2819,
  },
  {
    firstName: "Earline",
    lastName: "Bush",
    age: 29,
    email: "earlinebush@plasmox.com",
    salary: 3494,
  },
  {
    firstName: "Sanford",
    lastName: "Hurley",
    age: 26,
    email: "sanfordhurley@plasmox.com",
    salary: 3068,
  },
  {
    firstName: "Todd",
    lastName: "Gomez",
    age: 33,
    email: "toddgomez@plasmox.com",
    salary: 3906,
  },
];

//1.We want to find the total salary paid for employees whose age is less than 30.
const salaryBelow30 = employees.reduce((totalSalary: number, employee) => {
  if (employee.age < 30) totalSalary += employee.salary;

  return totalSalary;
}, 0);

assert.equal(salaryBelow30, 16124);

//2.Get the array of full-names of all employees. Full name is made up from first name and last name.
const employeesFullNames = employees.map(
  (employee) => employee.firstName + " " + employee.lastName,
);

assert.deepStrictEqual(employeesFullNames, [
  "Molly Rojas",
  "Marguerite Santiago",
  "Evelyn Oneil",
  "Consuelo Case",
  "Earline Bush",
  "Sanford Hurley",
  "Todd Gomez",
]);

//3.Get a string that contains all email ids separated by comma.

const emails = employees.map((employee) => employee.email).join(",");

assert.equal(
  emails,
  "mollyrojas@plasmox.com,margueritesantiago@plasmox.com,evelynoneil@plasmox.com,consuelocase@plasmox.com,earlinebush@plasmox.com,sanfordhurley@plasmox.com,toddgomez@plasmox.com",
);

/**
 * #15
We have an array that contains a list of objects that represent a fruit or a nut like so.
[
{
"name": "Banana",
"type": "fruit",
"treats": [
"constipation",
"vitamin deficiency",
"skin issues",
"sleep problems"
],
"nutritions": {
"protein": 8,
"carbs": 40,
"sugar": 30,
"vitamins": 45
}
},
{
"name": "Badam",
"type": "nut",
"treats": [
"bp",
"protein deficiency",
"skin issues",
"sugar"
],
"nutritions": {
"protein": 18,
"carbs": 20,
"sugar": 20,
"vitamins": 65
}
},
{
"name": "Cashew",
"type": "nut",
"treats": [
"bp",
"protein deficiency",
"skin issues",
"bone issues"
],
"nutritions": {
"protein": 22,
"carbs": 22,
"vitamins": 60
}
},
{
"name": "Wallnut",
"type": "nut",
"treats": [
"bp",
"protein deficiency",
"skin issues",
"bone issues"
],
"nutritions": {
"protein": 33,
"carbs": 26,
"vitamins": 64
}
},
{
"name": "Apple",
"type": "fruit",
"treats": [
"heart problems",
"skin issues",
"bone issues",
"migraine"
],
"nutritions": {
"protein": 22,
"carbs": 22,
"vitamins": 60
}
}

]
We need the following:
1.Write a function that will generate an object that will contain a key for each nutrition, and the value should be a fruit or nut that has highest content of that nutrition. If there is a tie, choose  the first one.
2.Get an array of all unique nutritions that are present in all the fruits and nuts above
3.Get an array of all unique health conditions that the fruits treat.
4.Get the array of all common health conditions that are treated by  all nuts.
5.Get a modified array of the fruits and nuts, where a new key called, totalNutritions get added to each object.  Total nutritions is nothing but the total of the values of the nutritions keys.
6.Find the total nutrition value of all fruits and nuts
7.Which fruits  / nuts solve the bone issues?
8.Which fruit or nut has maximum nutrition types ( like different type of nutritions)?
9.Which fruits or nuts solve migraine and have vitamins greater than or equal to 60
10.Which fruit or nut has lowest carbs? (Ignore the fruits/nuts that don't have carbs in the first place)
11.What is the total amount of proteins I will end up intaking if I eat each of the nuts except nuts those do not solve sugar issues as doctor has warned that my skin will become pale in case I eat such nuts?
12.If I eat one fruit and nut  each from the all fruits and nuts available in the above list, what is the quantity of vitamins I will end up intaking? Doctor has asked me to avoid fruit containing any sugar in it.

 */

const fruitsAndNut = [
  {
    name: "Banana",
    type: "fruit",
    treats: [
      "constipation",
      "vitamin deficiency",
      "skin issues",
      "sleep problems",
    ],
    nutritions: {
      protein: 8,
      carbs: 40,
      sugar: 30,
      vitamins: 45,
    },
  },
  {
    name: "Badam",
    type: "nut",
    treats: ["bp", "protein deficiency", "skin issues", "sugar"],
    nutritions: {
      protein: 18,
      carbs: 20,
      sugar: 20,
      vitamins: 65,
    },
  },
  {
    name: "Cashew",
    type: "nut",
    treats: ["bp", "protein deficiency", "skin issues", "bone issues"],
    nutritions: {
      protein: 22,
      carbs: 22,
      vitamins: 60,
    },
  },
  {
    name: "Wallnut",
    type: "nut",
    treats: ["bp", "protein deficiency", "skin issues", "bone issues"],
    nutritions: {
      protein: 33,
      carbs: 26,
      vitamins: 64,
    },
  },
  {
    name: "Apple",
    type: "fruit",
    treats: ["heart problems", "skin issues", "bone issues", "migraine"],
    nutritions: {
      protein: 22,
      carbs: 22,
      vitamins: 60,
    },
  },
];

//1.Write a function that will generate an object that will contain a key for each nutrition, and the value should be a fruit or nut that has highest content of that nutrition. If there is a tie, choose  the first one.

const highestNutrientValues = fruitsAndNut.reduce(
  (acc: Record<string, [number, string]>, cur) => {
    // nutrients: [protien value and fruit/nut name]
    const nutritionsList = cur.nutritions as Record<string, number>; //converting key as string because during loop it takes key as string
    for (let val in nutritionsList) {
      if (nutritionsList[val] !== undefined) {
        if (acc[val] === undefined)
          acc[val] = [nutritionsList[val], cur.name]; //adding to result
        else if (acc[val][0]! < nutritionsList[val]) {
          acc[val][0] = nutritionsList[val]; //updating result with large value
          acc[val][1] = cur.name; // also updating fruit/nut name
        }
      }
    }
    return acc;
  },
  {},
); //this will give the object which has the value both highest nutrient  and name of fruit/nut

//remove highest nutrient because we only need nutrient name and fruit/nut name
const highestNutrient = Object.fromEntries(
  //reconverting array to object
  Object.entries(highestNutrientValues).map((res) => {
    //converting object to array to perform map
    const [key, value] = res;
    return [key, value[1]];
  }),
);

assert.deepStrictEqual(highestNutrient, {
  protein: "Wallnut",
  carbs: "Banana",
  sugar: "Banana",
  vitamins: "Badam",
});

//2.Get an array of all unique nutritions that are present in all the fruits and nuts above
const uniqueNutrients = fruitsAndNut.reduce<string[]>((acc, cur) => {
  for (let val of Object.keys(cur.nutritions))
    if (!acc.includes(val)) acc.push(val);
  return acc;
}, []);
assert.deepStrictEqual(uniqueNutrients, [
  "protein",
  "carbs",
  "sugar",
  "vitamins",
]);

//3.Get an array of all unique health conditions that the fruits treat.
const uniqueHealthFruits = fruitsAndNut.reduce((acc: string[], cur) => {
  if (cur.type === "fruit")
    for (let val of cur.treats) if (!acc.includes(val)) acc.push(val);
  return acc;
}, []);

assert.deepStrictEqual(uniqueHealthFruits, [
  "constipation",
  "vitamin deficiency",
  "skin issues",
  "sleep problems",
  "heart problems",
  "bone issues",
  "migraine",
]);

//4.Get the array of all common health conditions that are treated by  all nuts.

const allHealthByNut = fruitsAndNut.reduce((acc: string[][], cur) => {
  if (cur.type === "nut") acc.push(cur.treats);
  return acc;
}, []); //gives array of all the health conditions of all nuts

const commanHealthByNut = allHealthByNut.reduce((acc: string[], cur) => {
  return acc.filter((val) => cur.includes(val)); //considering first array and filtering common conditions
}, allHealthByNut[0]!); //initializing with first nut treats

assert.deepStrictEqual(commanHealthByNut, [
  "bp",
  "protein deficiency",
  "skin issues",
]);

//5.Get a modified array of the fruits and nuts, where a new key called, totalNutritions get added to each object.  Total nutritions is nothing but the total of the values of the nutritions keys.

const totalNutritionsAdded = fruitsAndNut.map((items) => {
  const total = Object.values(items.nutritions).reduce((acc, cur) => {
    acc += cur;
    return acc;
  }, 0);
  return {
    ...items,
    totalNutritions: total, //adding totalNutritions property
  };
});

assert.deepStrictEqual(totalNutritionsAdded, [
  {
    name: "Banana",
    type: "fruit",
    treats: [
      "constipation",
      "vitamin deficiency",
      "skin issues",
      "sleep problems",
    ],
    nutritions: { protein: 8, carbs: 40, sugar: 30, vitamins: 45 },
    totalNutritions: 123,
  },
  {
    name: "Badam",
    type: "nut",
    treats: ["bp", "protein deficiency", "skin issues", "sugar"],
    nutritions: { protein: 18, carbs: 20, sugar: 20, vitamins: 65 },
    totalNutritions: 123,
  },
  {
    name: "Cashew",
    type: "nut",
    treats: ["bp", "protein deficiency", "skin issues", "bone issues"],
    nutritions: { protein: 22, carbs: 22, vitamins: 60 },
    totalNutritions: 104,
  },
  {
    name: "Wallnut",
    type: "nut",
    treats: ["bp", "protein deficiency", "skin issues", "bone issues"],
    nutritions: { protein: 33, carbs: 26, vitamins: 64 },
    totalNutritions: 123,
  },
  {
    name: "Apple",
    type: "fruit",
    treats: ["heart problems", "skin issues", "bone issues", "migraine"],
    nutritions: { protein: 22, carbs: 22, vitamins: 60 },
    totalNutritions: 104,
  },
]);

//6.Find the total nutrition value of all fruits and nuts
const totalNutritionsAll = fruitsAndNut.reduce((acc, cur) => {
  return (
    acc +
    Object.values(cur.nutritions).reduce((res, currentNutrition) => {
      return res + currentNutrition;
    }, 0)
  );
}, 0);

assert.equal(totalNutritionsAll, 577);

//7.Which fruits  / nuts solve the bone issues?

const boneIssueSolver = fruitsAndNut
  .filter((items) => items.treats.includes("bone issues"))
  .map((items) => items.name);

assert.deepStrictEqual(boneIssueSolver, ["Cashew", "Wallnut", "Apple"]);

//8.Which fruit or nut has maximum nutrition types ( like different type of nutritions)?

const maximum = fruitsAndNut.reduce((acc, cur) => {
  //get the maximum nutritions type
  if (acc > Object.keys(cur.nutritions).length) return acc;
  else return Object.keys(cur.nutritions).length;
}, 0);

const maximumNutritionsType = fruitsAndNut
  .filter((items) => Object.keys(items.nutritions).length === maximum) //considering all the fruits.nut which as maximum nutrition type
  .map((items) => items.name);

assert.deepStrictEqual(maximumNutritionsType, ["Banana", "Badam"]);

//9.Which fruits or nuts solve migraine and have vitamins greater than or equal to 60

const solveMigraine = fruitsAndNut
  .filter(
    (items) =>
      items.treats.includes("migraine") && items.nutritions.vitamins >= 60,
  )
  .map((item) => item.name);

assert.deepStrictEqual(solveMigraine, ["Apple"]);

//10.Which fruit or nut has lowest carbs? (Ignore the fruits/nuts that don't have carbs in the first place)

const lowCarb = fruitsAndNut.reduce((acc, cur) => {
  if (cur.nutritions.carbs !== undefined && cur.nutritions.carbs < acc)
    return cur.nutritions.carbs;
  else return acc;
}, Infinity);

const LowestCarbs = fruitsAndNut
  .filter((items) => items.nutritions.carbs === lowCarb)
  .map((item) => item.name);

assert.deepStrictEqual(LowestCarbs, ["Badam"]);

//11.What is the total amount of proteins I will end up intaking if I eat each of the nuts except nuts those do not solve sugar issues as doctor has warned that my skin will become pale in case I eat such nuts?

const totalProtein = fruitsAndNut
  .filter((items) => items.type === "nut" && items.treats.includes("sugar"))
  .reduce((acc, cur) => acc + cur.nutritions.protein, 0);

assert.equal(totalProtein, 18);

//12. If I eat one fruit and nut  each from the all fruits and nuts available in the above list, what is the quantity of vitamins I will end up intaking? Doctor has asked me to avoid fruit containing any sugar in it.

const quantityVitamins = fruitsAndNut
  .filter(
    (item) =>
      !(item.type == "fruit" && Object.keys(item.nutritions).includes("sugar")),
  ) //only for the fruit we have restriction
  .reduce((acc, cur) => {
    return acc + cur.nutritions.vitamins;
  }, 0);

assert.equal(quantityVitamins, 249);
