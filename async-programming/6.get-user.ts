import { delay } from "./5.delay.ts";
/**
 * 6.Implement the following function

function getUsers(delay = 2000):Promise<User[]>
// should do a GET from : https://jsonplaceholder.typicode.com/users
// this function should introduce an additional delay of 2 secs (by default) before it can return the result as a promise.

Implement a simple vitest based test for the above. 

 */

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};
export async function getUsers(delayTime = 0): Promise<User[]> {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users"); //returns object
    const users = await response.json();
    await delay(delayTime);
    return users;
  } catch {
    throw new Error("yoo");
  }
}
