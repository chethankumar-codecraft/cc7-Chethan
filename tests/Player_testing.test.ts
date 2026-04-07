import { it, describe, expect, vi } from "vitest";
import { Player } from "../drumkit-project/models/Player.ts";

describe("Testing Player", () => {
  it("The given recording should normalise", () => {
    const recording = [
      { key: "A", timeStamp: 10 },
      { key: "B", timeStamp: 20 },
      { key: "PAUSED", timeStamp: 30 },
      { key: "Z", timeStamp: 50 },
    ];
    const player = new Player(recording, () => {});
    expect(player.normaliseBeats()).toEqual([
      { key: "A", timeStamp: 0 },
      { key: "B", timeStamp: 10 },
      { key: "Z", timeStamp: 20 },
    ]);
  });

  it("The given recording wiht multiple pause should normalise ", () => {
    const recording = [
      { key: "A", timeStamp: 10 },
      { key: "PAUSED", timeStamp: 20 },
      { key: "B", timeStamp: 50 },
      { key: "PAUSED", timeStamp: 70 },
      { key: "C", timeStamp: 100 },
    ];
    const player = new Player(recording, () => {});
    console.log(player.normaliseBeats());
    expect(player.normaliseBeats()).toEqual([
      { key: "A", timeStamp: 0 },
      { key: "B", timeStamp: 10 },
      { key: "C", timeStamp: 30 },
    ]);
  });

  it("Testing Multiple pause, continue and play", async () => {
    vi.useFakeTimers();
    const recording = [
      { key: "A", timeStamp: 10 },
      { key: "B", timeStamp: 20 },
      { key: "C", timeStamp: 30 },
      { key: "PAUSED", timeStamp: 40 },
      { key: "E", timeStamp: 60 },
      { key: "F", timeStamp: 70 },
    ];
    let count = 0;
    const mockPlayback = () => {
      count++; //just to know how much time mockplayback is called
    };

    const player = new Player(recording, mockPlayback);

    player.play();

    await vi.advanceTimersByTimeAsync(0); // A plays
    expect(count).toBe(1);
    expect(player.beatIndex).toBe(1);

    player.pause();
    await vi.advanceTimersByTimeAsync(50); // nothing should happen
    expect(count).toBe(1);
    expect(player.beatIndex).toBe(1);

    player.resume();
    await vi.advanceTimersByTimeAsync(10); //B and C plays
    expect(count).toBe(3);
    expect(player.beatIndex).toBe(3); //after complete beatindex makes to 0 itself

    await vi.advanceTimersByTimeAsync(10); //E plays
    expect(count).toBe(4);
    expect(player.beatIndex).toBe(4);

    player.pause();
    await vi.advanceTimersByTimeAsync(50); // nothing should happen
    expect(count).toBe(4);
    expect(player.beatIndex).toBe(4);

    player.resume();
    await vi.advanceTimersByTimeAsync(0); // F and
    expect(count).toBe(5);
    expect(player.beatIndex).toBe(0); //after all beatindex initialize to 0 itself
  });

  //testing subscribe and unsubscriber
  it("should notify subscriber on each beat", async () => {
    vi.useFakeTimers();

    const recording = [
      { key: "A", timeStamp: 10 },
      { key: "B", timeStamp: 20 },
      { key: "C", timeStamp: 30 },
      { key: "D", timeStamp: 40 },
    ];

    let notifyCount = 0;

    const playback = () => {};

    const listener = () => {
      notifyCount++;
    };

    const player = new Player(recording, playback);

    player.subscribe(listener);

    player.play();
    await vi.advanceTimersByTimeAsync(0); //A plays

    expect(notifyCount).toBe(1);
    expect(player.beatIndex).toBe(1);

    // B plays
    await vi.advanceTimersByTimeAsync(10);
    expect(notifyCount).toBe(2);

    player.unsubscribe(listener);
    await vi.advanceTimersByTimeAsync(10);
    expect(notifyCount).toBe(2); //not incremeneted bcs of unsubscribe

    player.subscribe(listener);
    //c plays
    await vi.advanceTimersByTimeAsync(10);
    expect(notifyCount).toBe(3);
  });
});
