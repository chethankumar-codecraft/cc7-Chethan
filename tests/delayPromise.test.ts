import { describe, it, expect, vi } from "vitest";
import { delay } from "../async-programming/5.delay.ts";

describe("Testing Delay function using vitest", () => {
  it("should resolve after some time", () => {
    vi.useFakeTimers();
    const promiseResult = delay(1000);
    vi.advanceTimersByTime(1000);
    expect(promiseResult).resolves.toBe(undefined);
    vi.useRealTimers();
  });
  it("should reject if time delay incorrect", async () => {
    vi.useFakeTimers();
    let isCalled = false;
    const mockFn = () => {
      isCalled = true; //if this function call isCalled becomes true
    };

    delay(2000).then(() => mockFn()); //mockFn called after the resolve

    await vi.advanceTimersByTimeAsync(1000); //it is async and returns the promise so this will also got to microtask queue
    expect(isCalled).toBe(false); //after 1000 sec
    await vi.advanceTimersByTimeAsync(1000);
    expect(isCalled).toBe(true); //after 2000 sec
    vi.useRealTimers();
  });
});
