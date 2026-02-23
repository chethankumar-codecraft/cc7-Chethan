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

    list.addAtHead(100);
    list.addAtHead(200);

    expect(list.removeFromEnd()).toBe(100);
    expect(list.length()).toBe(1);
  });
  it("Removing element from head", () => {
    const list = new LinkedList<number>();

    list.addAtHead(100);
    list.addAtHead(200);

    expect(list.length()).toBe(2);
    expect(list.removeFromHead()).toBe(200);
    expect(list.length()).toBe(1);
  });
  it("Length of the List", () => {
    const list = new LinkedList<number>();

    list.addAtHead(100);
    list.addAtHead(200);

    expect(list.length()).toBe(2);
    list.addAtEnd(500);
    expect(list.length()).toBe(3);
  });
  it("Seraching in List", () => {
    const list = new LinkedList<string>();

    list.addAtHead("Chethan");
    list.addAtHead("Codecraft");

    expect(list.searchFor("Chethan")).toBe(true);
    expect(list.searchFor("Hello")).toBe(false);
  });
});
