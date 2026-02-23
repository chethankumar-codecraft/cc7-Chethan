import { it, describe, expect } from "vitest";
import { Stack } from "../Stack_LinkedList.ts";

describe("Stack using LinkedList", () => {
  it("Pushing to stack", () => {
    const stack = new Stack<number>();

    stack.push(10);
    stack.push(20);
    stack.push(500);

    expect(stack.size()).toBe(3);
    expect(stack.top()).toBe(500);
    expect(stack.pop()).toBe(500);
    expect(stack.size()).toBe(2);
  });

  it("Poping to stack", () => {
    const stack = new Stack<number>();

    stack.push(10);
    stack.push(500);
    expect(stack.size()).toBe(2);
    stack.pop();
    expect(stack.pop()).toBe(10);
    expect(stack.size()).toBe(0);
    expect(stack.pop()).toBe(null);
  });
  it("Top of the stack", () => {
    const stack = new Stack<string>();

    expect(stack.top()).toBe(null);
    stack.push("Codecraft");
    stack.push("Chethan");

    expect(stack.top()).toBe("Chethan");
  });
});
