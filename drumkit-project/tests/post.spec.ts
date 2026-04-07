import { test, expect } from "@playwright/test";

/**
We want to make this more interesting. We want to be able to record the user’s beats and be able to replay. Thus, there needs to be controls to
Record, pause recording and resume recording 
Playback controls that lets you playback the most recent recording. For now, our app is going to support only one recording. 
A recording is nothing but the keys pressed and the relative time when they were pressed.  We are not doing any audio processing or something like that. We simply save the keystrokes and then play them back using the already available logic in the original app.
Recording is saved to the local storage. The app can support a button to clear the existing recording also, so that you can start afresh.

 */
//Testing initial load of page 1

test("app loads in normal state", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  // Check status text
  await expect(page.locator("#record-msg")).toHaveText(/normal/i);
  await expect(page.locator("#record")).toBeEnabled();
  await expect(page.locator("#pause")).toBeDisabled();
  await expect(page.locator("#playRecording")).toBeDisabled();
  await expect(page.locator("#pausePlayback")).toBeDisabled();
  await expect(page.locator(".progress-container")).toBeHidden();
});

test("record → add beats → pause → continue → stop", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  //Start recording
  await page.click("#record");
  await expect(page.locator("#record-msg")).toHaveText(/recording-progress/i);

  // Add beats
  await page.keyboard.press("A");
  await page.waitForTimeout(500);
  await page.keyboard.press("S");

  //  Pause recording
  await page.click("#pause");
  await expect(page.locator("#record-msg")).toHaveText(/recording-pause/i);

  // Try adding beat while paused
  await page.keyboard.press("D");

  // Continue recording
  await page.click("#pause");
  await expect(page.locator("#record-msg")).toHaveText(/recording-progress/i);

  // Add more beats
  await page.keyboard.press("F");

  //Stop recording
  await page.click("#record");
  await expect(page.locator("#record-msg")).toHaveText(/normal/i);

  //play back enables
  await expect(page.locator("#playRecording")).toBeEnabled();
});

test("Playback flow works correctly", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await page.click("#record");
  await page.keyboard.press("A");
  await page.waitForTimeout(500);
  await page.keyboard.press("S");
  await page.waitForTimeout(500);
  await page.keyboard.press("F");
  await page.click("#pause");
  await page.keyboard.press("D");
  await page.click("#pause");
  await page.keyboard.press("F");
  await page.click("#record");

  //playback
  await page.click("#playRecording");
  await expect(page.locator("#record-msg")).toHaveText(/playback-progress/i);

  const playBtn = page.locator("#playRecording");
  const pauseBtn = page.locator("#pausePlayback");

  await expect(playBtn).toHaveText("STOP PLAYING");
  await expect(pauseBtn).toHaveText("PAUSE");

  // Pause playback
  await pauseBtn.click();
  await expect(pauseBtn).toHaveText("CONTINUE");
  await expect(page.locator("#record-msg")).toHaveText(/playback-pause/i);

  // Continue playback
  await pauseBtn.click();
  await expect(pauseBtn).toHaveText("PAUSE");
  await expect(page.locator("#record-msg")).toHaveText(/playback-progress/i);

  // Stop playback
  await playBtn.click();
  await expect(page.locator("#record-msg")).toHaveText(/normal/i);
  await expect(playBtn).toHaveText("PLAY RECORDING");
});
test("clear recording works", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  // Record something
  await page.click("#record");
  await page.keyboard.press("A");
  await page.click("#record");

  // Clear recording
  await page.click("#clearRecording");

  // Confirm dialog
  await page.click("#confirmYes");

  // Playback should be disabled
  await expect(page.locator("#playRecording")).toBeDisabled();
});
//edit keys
test("edit keys functionality works", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await page.click("#edit-keys");
  await expect(page.locator("#record")).toBeDisabled();
  await expect(page.locator("#pause")).toBeDisabled();
  await expect(page.locator("#playRecording")).toBeDisabled();

  await page.click("#resetKeys");
  // Confirm reset (if you have a confirm dialog)
  const confirmDialog = page.locator("#confirmDialog");
  if (await confirmDialog.isVisible()) {
    await page.click("#confirmYes");
  }
  await page.click("#edit-keys");
  const firstKey = page.locator(".keys div").first();
  await expect(firstKey).toBeVisible();

  await firstKey.click();

  // Edit dialog should now be visible
  const editDialog = page.locator("#editDialog");
  await expect(editDialog).toBeVisible();

  // Fill in a new key
  const editKeyInput = page.locator("#editKey");
  await expect(editKeyInput).toBeVisible();
  await editKeyInput.fill("P");

  await page.selectOption("#editSound", "/sounds/clap.wav");

  // Save the changes
  await page.click("#saveEdit");
  await expect(editDialog).not.toBeVisible();

  //delete and add
  await firstKey.click();
  await page.click("#deleteKey"); // remove it
  if (await confirmDialog.isVisible()) {
    await page.click("#confirmYes");
  }
  await page.click("#addKey"); // open add key dialog
  await page.fill("#editKey", "W");
  await page.selectOption("#editSound", "/sounds/clap.wav");
  await page.click("#saveEdit");

  // Now first key should be "D"
  const newKey = page.locator(".keys div").last().locator("kbd");
  await expect(newKey).toHaveText("W");
});
