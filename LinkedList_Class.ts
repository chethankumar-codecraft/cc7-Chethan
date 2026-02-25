/**
 * 13.  Explore classes in TypeScript and implement the following:
Implement a LinkedList class implementation that conforms to the following interface:
interface LinkedListInterface<T> {
 head: ListNode<T> | null;
 tail: ListNode<T> | null;
 addAtEnd(t: T): T;
 removeFromEnd(): T | null;
 addAtHead(t: T): T;
 removeFromHead(t: T): T | null;
 searchFor(t: T): T | null;
 length(): number;
}

Also explore an industry standard unit testing framework called vitest and use that instead of asserts. Also implement this in a dedicated module and export the linked list class. Your test file should import it and use it.

 */

class ListNode<T> {
  data: T;
  next: ListNode<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}
export class LinkedList<T> {
  private head: ListNode<T> | null;
  private tail: ListNode<T> | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  get headValue(): null | T {
    if (this.head === null) return null;
    else return this.head.data;
  }
  get tailValue(): null | T {
    if (this.tail === null) return null;
    else return this.tail.data;
  }

  addAtEnd(t: T): T {
    const newNode = new ListNode(t);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }

    return t;
  }

  removeFromEnd(): T | null {
    //Empty list
    if (this.head === null) return null;

    //incase of only one data
    if (this.head === this.tail) {
      let deleted = this.head;
      this.head = null;
      this.tail = null;
      return deleted.data;
    }

    let cur = this.head;
    while (cur.next !== this.tail) {
      cur = cur.next!;
    }
    let deleted = cur.next!;
    cur.next = null;
    this.tail = cur;
    return deleted.data;
  }

  addAtHead(t: T): T {
    const newNode = new ListNode(t);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    return t;
  }

  removeFromHead(): T | null {
    if (this.head === null) return null;

    //one element
    if (this.head === this.tail) {
      let deleted = this.head;
      this.head = null;
      this.tail = null;
      return deleted.data;
    }

    let deleted = this.head;
    this.head = this.head.next;
    return deleted.data;
  }

  searchFor(t: T): boolean {
    if (this.head === null) return false;
    let cur = this.head;
    while (cur !== null) {
      if (t === cur.data) return true;
      cur = cur.next!;
    }

    return false;
  }

  length(): number {
    let length = 0;
    let cur = this.head;
    while (cur !== null) {
      length++;
      cur = cur.next;
    }
    return length;
  }
}
