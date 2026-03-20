import { it, expect, describe } from "vitest";
import type { DrumState } from "../drumkit-project/reducer.ts";
import { drumkitReducer } from "../drumkit-project/reducer.ts";

describe("Testing Reducer for Recording", () => {
  let state: DrumState = {
    mode: "normal",
    recording: {
      name: "Recent",
      beats: [],
    },
  };
  const time = Date.now();
  //Record
  it("Testing start recording", () => {
    expect(
      drumkitReducer(state, { type: "START_RECORDING", timeStamp: time }),
    ).toEqual({
      mode: "recording-progress",
      recording: {
        name: "Recent",
        beats: [],
      },
    });
  });
  it("Beat should store the key and time if it is in record progress", () => {
    state = {
      mode: "recording-progress",
      recording: {
        name: "Recent",
        beats: [],
      },
    };
    expect(
      drumkitReducer(state, {
        type: "BEAT",
        data: { key: "A", timeStamp: time },
      }),
    ).toEqual({
      mode: "recording-progress",
      recording: {
        name: "Recent",
        beats: [{ key: "A", timeStamp: time }],
      },
    });
  });
  //Pause
  it("Pause record change the mode if it is in recording state", () => {
    state = {
      mode: "recording-progress",
      recording: {
        name: "Recent",
        beats: [],
      },
    };
    expect(
      drumkitReducer(state, {
        type: "PAUSE_RECORDING",
        data: { key: "PAUSED", timeStamp: time },
      }),
    ).toEqual({
      mode: "recording-pause",
      recording: {
        name: "Recent",
        beats: [{ key: "PAUSED", timeStamp: time }],
      },
    });
  });

  it("Pause record will not change the mode if it is not in recording state", () => {
    state = {
      mode: "normal",
      recording: {
        name: "Recent",
        beats: [
          { key: "A", timeStamp: time },
          { key: "PAUSED", timeStamp: time },
        ],
      },
    };
    expect(
      drumkitReducer(state, {
        type: "PAUSE_RECORDING",
        data: { key: "PAUSED", timeStamp: time },
      }),
    ).toEqual({
      mode: "normal",
      recording: {
        name: "Recent",
        beats: [
          { key: "A", timeStamp: time },
          { key: "PAUSED", timeStamp: time },
        ],
      },
    });
  });

  it("Beat will not store the key and time if it is in pause", () => {
    state = {
      mode: "recording-pause",
      recording: {
        name: "Recent",
        beats: [
          { key: "A", timeStamp: time },
          { key: "PAUSED", timeStamp: time },
        ],
      },
    };
    expect(
      drumkitReducer(state, {
        type: "BEAT",
        data: { key: "B", timeStamp: time },
      }),
    ).toEqual({
      mode: "recording-pause",
      recording: {
        name: "Recent",
        beats: [
          { key: "A", timeStamp: time },
          { key: "PAUSED", timeStamp: time },
        ],
      },
    });
  });

  //continue
  it("continue should change the state to recording if it is pause state", () => {
    state = {
      mode: "recording-pause",
      recording: {
        name: "Recent",
        beats: [],
      },
    };
    expect(drumkitReducer(state, { type: "CONTINUE_RECORDING" })).toEqual({
      mode: "recording-progress",
      recording: {
        name: "Recent",
        beats: [],
      },
    });
  });

  it("continue should not change the state to other than pause state", () => {
    state = {
      mode: "recording-progress",
      recording: {
        name: "Recent",
        beats: [],
      },
    };
    expect(drumkitReducer(state, { type: "CONTINUE_RECORDING" })).toEqual({
      mode: "recording-progress",
      recording: {
        name: "Recent",
        beats: [],
      },
    });
  });

  //beat

  it("Beat will add the key and time if it is in record progress", () => {
    state = {
      mode: "recording-progress",
      recording: {
        name: "Recent",
        beats: [{ key: "A", timeStamp: time }],
      },
    };
    expect(
      drumkitReducer(state, {
        type: "BEAT",
        data: { key: "Z", timeStamp: time + 1 },
      }),
    ).toEqual({
      mode: "recording-progress",
      recording: {
        name: "Recent",
        beats: [
          { key: "A", timeStamp: time },
          { key: "Z", timeStamp: time + 1 },
        ],
      },
    });
  });
  //stop
  it("stop recording will come to normal state if it is in pausing state or in progress Record", () => {
    state = {
      mode: "recording-progress",
      recording: {
        name: "Recent",
        beats: [
          { key: "A", timeStamp: time },
          { key: "PAUSED", timeStamp: time },
        ],
      },
    };
    expect(drumkitReducer(state, { type: "STOP_RECORDING" })).toEqual({
      mode: "normal",
      recording: {
        name: "Recent",
        beats: [
          { key: "A", timeStamp: time },
          { key: "PAUSED", timeStamp: time },
        ],
      },
    });
  });
  it("stop recording will not change state other than progress and pause state", () => {
    state = {
      mode: "playback-pause",
      recording: {
        name: "Recent",
        beats: [],
      },
    };
    expect(drumkitReducer(state, { type: "STOP_RECORDING" })).toEqual({
      mode: "playback-pause",
      recording: {
        name: "Recent",
        beats: [],
      },
    });
  });
});
describe("Testing Reducer for Playback", () => {
  //start
  let state: DrumState = {
    mode: "normal",
    recording: {
      name: "Recent",
      beats: [],
    },
  };
  it("start playback shift to start-playback if it is in normal state", () => {
    expect(
      drumkitReducer(state, {
        type: "START_PLAYBACK",
      }),
    ).toEqual({
      mode: "playback-progress",
      recording: {
        name: "Recent",
        beats: [],
      },
    });
  });
  it("start playback will not change the state other than normal", () => {
    state = {
      mode: "playback-progress",
      recording: {
        name: "Recent",
        beats: [],
      },
    };
    expect(
      drumkitReducer(state, {
        type: "START_PLAYBACK",
      }),
    ).toEqual({
      mode: "playback-progress",
      recording: {
        name: "Recent",
        beats: [],
      },
    });
  });

  //pause-playback
  it("pause playback will change the state if it is progress", () => {
    state = {
      mode: "playback-progress",
      recording: {
        name: "Recent",
        beats: [],
      },
    };
    expect(
      drumkitReducer(state, {
        type: "PAUSE_PLAYBACK",
      }),
    ).toEqual({
      mode: "playback-pause",
      recording: {
        name: "Recent",
        beats: [],
      },
    });
  });

  it("pause playback will not change the state for other than progress", () => {
    state = {
      mode: "normal",
      recording: {
        name: "Recent",
        beats: [],
      },
    };
    expect(
      drumkitReducer(state, {
        type: "PAUSE_PLAYBACK",
      }),
    ).toEqual({
      mode: "normal",
      recording: {
        name: "Recent",
        beats: [],
      },
    });
  });

  //continue-callback
  it("continue playback will change the state for pause state", () => {
    state = {
      mode: "playback-pause",
      recording: {
        name: "Recent",
        beats: [],
      },
    };
    expect(
      drumkitReducer(state, {
        type: "CONTINUE_PLAYBACK",
      }),
    ).toEqual({
      mode: "playback-progress",
      recording: {
        name: "Recent",
        beats: [],
      },
    });
  });
  it("continue playback will not change the state other than pause state", () => {
    state = {
      mode: "normal",
      recording: {
        name: "Recent",
        beats: [],
      },
    };
    expect(
      drumkitReducer(state, {
        type: "CONTINUE_PLAYBACK",
      }),
    ).toEqual({
      mode: "normal",
      recording: {
        name: "Recent",
        beats: [],
      },
    });
  });

  //stop-playback
  it("stop playback will change the state for pause playback and progress plyaback", () => {
    state = {
      mode: "playback-progress",
      recording: {
        name: "Recent",
        beats: [],
      },
    };
    expect(
      drumkitReducer(state, {
        type: "STOP_PLAYBACK",
      }),
    ).toEqual({
      mode: "normal",
      recording: {
        name: "Recent",
        beats: [],
      },
    });
  });

  it("stop playback will not change the state for other than pause playback and progress plyaback", () => {
    state = {
      mode: "normal",
      recording: {
        name: "Recent",
        beats: [],
      },
    };
    expect(
      drumkitReducer(state, {
        type: "STOP_PLAYBACK",
      }),
    ).toEqual({
      mode: "normal",
      recording: {
        name: "Recent",
        beats: [],
      },
    });
  });
});
