interface Point {
  x: number;
  y: number;
}
abstract class Shape {
  // A class can be marked as abstract, if you dont want explicit instance of this class be ever created.
  private origin: Point;

  area(): number {
    return 0;
  }

  constructor() {
    this.origin = { x: 0, y: 0 };
  }
}

class Rectangle extends Shape {
  area() {
    // Implicite overrides can be warned using "noImplicitOverride": true, setting in tsconfig.json
    // Always use override keyword to ensure safe overrides, in case base method is renamed, we will get an error.
    return this.width * this.height;
  }

  // ! exercise, rewrite the constructor where the vars width, and height will be auto created.
  constructor(
    private width: number,
    private height: number,
  ) {
    super();
  }
  // * Getters
  get w() {
    return this.width;
  }

  get h() {
    return this.height;
  }

  //* Setters
  set w(width: number) {
    this.width = width;
  }
  set h(height: number) {
    this.height = height;
  }
}

const rectangle = new Rectangle(10, 22);
rectangle.w = 15;
rectangle.h = rectangle.w + 10; // Setters and getters usage

//! Exercise. Implement Circle class. It should override from Shape. Implement getter to access its radius.  Then create an Array of circles and rectangles. Find the item in the array that has least area.

const PI = 3.14;
class Circle extends Shape {
  private radius: number;

  constructor(radius: number) {
    super();
    this.radius = radius;
  }

  area() {
    return PI * Math.pow(this.radius, 2);
  }

  get radiusValue() {
    return this.radius;
  }

  set radiusValue(r: number) {
    this.radius = r;
  }
}

const arr: Shape[] = [
  new Circle(5),
  new Circle(10),
  new Circle(7),
  new Rectangle(20, 5),
  new Rectangle(2, 2),
  new Rectangle(10, 10),
];

let minArea = arr[0]?.area();
let res = arr[0];
for (let i = 1; i < arr.length; i++)
  if (minArea! > arr[i]!.area()) {
    minArea = arr[i]!.area();
    res = arr[i];
  }

console.log(`The smallest area is ${minArea}`);
console.log("The shape is :", res);
