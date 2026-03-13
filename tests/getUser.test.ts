import { describe, it, expect } from "vitest";
import UserData from "./users.json" with { type: "json" };
import { getUsers } from "../async-programming/6.get-user.ts";

describe("Testing user data fetching", () => {
  it("User dat should be same as in file", async () => {
    const users = await getUsers();
    expect(users).toEqual(UserData);
  });
  it("Delay should match the time", async () => {
    const start = Date.now(); //gives current time in millisecond
    await getUsers(2000);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(2000); //we cannot say exact time because fetching may take more time even if we use faketimer
  });
});
