import { LinkedList } from "./LinkedList_Class.ts";

/**
 * 14. Implement Stack data structure that uses the LinkedList<T> implementation as its underlying data structure.
 */

export class Stack<T> {
  readonly items: LinkedList<T>;
  private sizeOfStack;

  constructor() {
    this.items = new LinkedList<T>();
    this.sizeOfStack = 0;
  }

  push(t: T): T {
    this.sizeOfStack++;
    return this.items.addAtHead(t);
  }

  pop(): T | null {
    this.sizeOfStack--;
    return this.items.removeFromHead();
  }

  top(): T | null {
    return this.items.headValue;
  }

  size(): number {
    return this.sizeOfStack;
  }
}
