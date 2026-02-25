import { Stack } from "./Stack_LinkedList.ts";
/**
 * 
 * 15. Implement an expression evaluation algorithm that makes use of Stack that you implemented in 14 above. 
// input: 5 * ( 6 + 2 ) - 12 / 4  Output:  37
// Wrong input : a * 3  Output: undefined
function evaluateExpression(expression: string): number | undefined {


}
Here to evaluate expression i will first convert infix to postfix then evaluate which makes simple

 */

export function evaluateExpression(expression: string): number | undefined {
  if (expression.trim() === "") throw new Error("Expression cannot be empty");

  let postfix = convertToPostfix(expression);
  if (postfix === undefined) return undefined;

  const stack = new Stack<number>();

  for (let char of postfix.trim().split(" ")) {
    if ("*/+-%".includes(char)) {
      let op1 = stack.pop();
      let op2 = stack.pop();
      if (op1 === null || op2 === null) return undefined;
      stack.push(performOperation(op2, op1, char as Operator));
    } else stack.push(Number(char));
  }
  if (stack.size() !== 1) return undefined;

  return stack.top()!;
}

type Operator = "-" | "*" | "+" | "/" | "%";

function performOperation(
  num1: number,
  num2: number,
  operator: Operator,
): number {
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/": {
      if (num2 === 0) throw new Error("Division by zero");
      return num1 / num2;
    }
    case "%": {
      if (num2 === 0) throw new Error("Division by zero");
      return num1 % num2;
    }
  }
}

function precedence(val: Operator) {
  if (val === "-" || val === "+") return 1;
  else if (val === "*" || val === "/") return 2;
  return 0;
}

function convertToPostfix(infix: string): string | undefined {
  const operatorStack = new Stack<string>();
  let res = "";

  for (let val of infix.split(" ")) {
    if (!Number.isNaN(Number(val)))
      //only execute if the val is number
      res += val + " ";
    else if (val === "(") operatorStack.push(val);
    else if (val === ")") {
      while (operatorStack.top() !== null && operatorStack.top() !== "(")
        res += operatorStack.pop() + " ";
      if (operatorStack.top() === null) throw new Error("Invalid parenthesis");
      operatorStack.pop();
    } else if ("*-/+%".includes(val)) {
      while (
        operatorStack.top() !== null &&
        precedence(operatorStack.top() as Operator) >=
          precedence(val as Operator)
      ) {
        res += operatorStack.pop() + " ";
      }
      operatorStack.push(val);
    } else return undefined;
  }
  while (operatorStack.top() !== null) {
    if (operatorStack.top() === "(") throw new Error("Invalid parenthesis"); //expression has invalid paranthesis
    res += operatorStack.pop() + " ";
  }
  return res;
}
