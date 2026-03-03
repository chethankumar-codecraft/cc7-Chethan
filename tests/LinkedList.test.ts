import { describe, it, expect } from "vitest";
import { LinkedList } from "../LinkedList_Class.ts";

describe("LinkedList", () => {
  it("Adding element at end", () => {
    const list = new LinkedList<number>();

    list.addAtEnd(10);
    list.addAtEnd(20);
    list.addAtEnd(30);
    expect(list.length()).toBe(3);
    expect(list.removeFromEnd()).toBe(30);
  });
  it("Adding element at head", () => {
    const list = new LinkedList<number>();

    list.addAtHead(5);
    list.addAtHead(6);

    expect(list.length()).toBe(2);
    expect(list.removeFromHead()).toBe(6);
  });
  it("Removing element from end", () => {
    const list = new LinkedList<number>();
    expect(list.removeFromEnd()).toBe(null);
    list.addAtHead(100);
    expect(list.removeFromEnd()).toBe(100);
    list.addAtHead(200);
    list.addAtEnd(5);

    expect(list.removeFromEnd()).toBe(5);
    list.addAtHead(200);
    list.addAtEnd(5);
    list.addAtHead(44);
    expect(list.length()).toBe(4);
  });
  it("Removing element from head", () => {
    const list = new LinkedList<number>();
    expect(list.removeFromHead()).toBe(null);
    list.addAtHead(100);
    expect(list.removeFromHead()).toBe(100);
    list.addAtHead(200);
    list.addAtEnd(100);

    expect(list.length()).toBe(2);
    expect(list.removeFromHead()).toBe(200);
    expect(list.length()).toBe(1);
  });
  it("Length of the List", () => {
    const list = new LinkedList<number>();

    expect(list.length()).toBe(0);
    list.addAtHead(100);
    expect(list.length()).toBe(1);
    list.addAtHead(200);

    expect(list.length()).toBe(2);
    list.addAtEnd(500);
    expect(list.length()).toBe(3);
  });
  it("Seraching in List", () => {
    const list = new LinkedList<string>();
    expect(list.searchFor("Chethan", (a, b) => a === b)).toBe(false);
    list.addAtHead("Chethan");
    list.addAtHead("Codecraft");
    expect(list.searchFor("Chethan", (a, b) => a === b)).toBe(true);
    expect(list.searchFor("Chethan", (a, b) => a === b)).toBe(true);
    expect(list.searchFor("Hello", (a, b) => a === b)).toBe(false);

    const list1 = new LinkedList<{ a: number; b: number }>();
    list1.addAtHead({ a: 2, b: 2 });
    list1.addAtHead({ a: 1, b: 2 });

    expect(
      list1.searchFor({ a: 2, b: 2 }, (x, y) => x.a === y.a && x.b === y.b),
    ).toBe(true);
    expect(
      list1.searchFor({ a: 5, b: 2 }, (x, y) => x.a === y.a && x.b === y.b),
    ).toBe(false);
  });
});
