/**
 * Implement a function called 

function delay(milliseconds:number):Promise<undefined>
Test this function using vitest. Check how to correctly test time based functions in vitest.
 */

export function delay(milliseconds: number): Promise<undefined> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
