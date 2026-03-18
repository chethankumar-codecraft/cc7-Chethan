import { test, expect } from "@playwright/test";

/**
 * Add End to End integration tests using PlayWright
Try to learn Playwright and bring in playwright end to end tests to your app you developed in step 9. Scenarios we want to cover:

1. All positive cases - initial load - 1 st post
2. prev, next navigation
3. error scenarios - fail to fetch a post, or comment
4. Refresh - loads back the 1 st post, discarding all existing data.

 */
//Testing initial load of page 1
test("initial load gives the post 1 content", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("#post-id")).toHaveText("Post Id:#1");
});

//prev,next navigation
test("Testing navigation button", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("#post-id")).toHaveText("Post Id:#1"); //it matches the exact text
  await page.click("#next");
  await expect(page.locator("#post-id")).toHaveText("Post Id:#2");
  await page.click("#next");
  await expect(page.locator("#post-id")).toHaveText("Post Id:#3");
  await page.click("#previous");
  await expect(page.locator("#post-id")).toHaveText("Post Id:#2");
});

//Errro scenerio
//post
test("Testing error while fetching posts fails", async ({ page }) => {
  await page.route("**/posts/*", (route) => {
    //it will handle the request
    route.abort(); //cancel the request so user get fetch failed
  });

  await page.goto("/");
  await expect(page.locator("#status")).toHaveText("Loading Post Failed");
});

// handling valid error response
test("Handles the internal server error", async ({ page }) => {
  await page.route("**/posts/*", async (route) => {
    await route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({
        error: "Internal Server Error",
      }),
    });
  });
  await page.goto("/");
  await expect(page.locator("#status")).toHaveText("Loading Post Failed");
});

//handiling 404 error
test("Handles 404 not found", async ({ page }) => {
  await page.route("**/posts/*", async (route) => {
    await route.fulfill({
      status: 404,
      contentType: "application/json",
      body: JSON.stringify({ error: "Not Found" }),
    });
  });

  await page.goto("/");
  await expect(page.locator("#status")).toHaveText("Loading Post Failed");
});

//comment
test("Testing error while fetching comments fails", async ({ page }) => {
  await page.route("**/comments", (route) => {
    //it will handle the request
    route.abort(); //cancel the request so user get fetch failed
  });
  await page.goto("/");

  await page.click("#comments");
  await expect(page.locator("#status")).toHaveText("Failed to fetch comments");
});

test("Testing refresh loads the 1st Post", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("#post-id")).toHaveText("Post Id:#1");
  await page.click("#next");
  await expect(page.locator("#post-id")).toHaveText("Post Id:#2");
  await page.click("#next");
  await expect(page.locator("#post-id")).toHaveText("Post Id:#3");
  await page.click("#next");
  await expect(page.locator("#post-id")).toHaveText("Post Id:#4");
  await page.click("#refresh");
  await expect(page.locator("#post-id")).toHaveText("Post Id:#1");
});
