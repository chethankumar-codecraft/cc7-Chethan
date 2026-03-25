export type DrumState = {
  mode:
    | "normal"
    | "recording-progress"
    | "recording-pause"
    | "playback-progress"
    | "playback-pause";
  recording: Recordings;
};

export type Recordings = {
  name: string;
  beats: Beat[];
};
export type Beat = {
  key: string;
  timeStamp: number;
};

export type Action =
  | { type: "START_RECORDING"; timeStamp: number }
  | { type: "STOP_RECORDING" }
  | { type: "PAUSE_RECORDING"; data: Beat } //key is "PAUSED" and timeStamp is time while click pause
  | { type: "CONTINUE_RECORDING" }
  | { type: "BEAT"; data: Beat }
  | { type: "START_PLAYBACK" }
  | { type: "PAUSE_PLAYBACK" }
  | { type: "STOP_PLAYBACK" }
  | { type: "CONTINUE_PLAYBACK" };

export const drumkitReducer = (state: DrumState, action: Action): DrumState => {
  switch (action.type) {
    case "START_RECORDING": {
      if (state.mode !== "normal") return state;
      return {
        ...state,
        mode: "recording-progress",
        recording: {
          ...state.recording,
          beats: [],
        },
      };
    }
    case "PAUSE_RECORDING": {
      if (state.mode !== "recording-progress") return state;
      return {
        ...state,
        mode: "recording-pause",
        recording: {
          ...state.recording,
          beats: [...state.recording.beats, action.data],
        },
      };
    }
    case "CONTINUE_RECORDING": {
      if (state.mode !== "recording-pause") return state;
      return {
        ...state,
        mode: "recording-progress",
      };
    }
    case "STOP_RECORDING": {
      if (
        state.mode !== "recording-progress" &&
        state.mode !== "recording-pause"
      )
        return state;
      return {
        ...state,
        mode: "normal",
      };
    }
    case "START_PLAYBACK": {
      if (state.mode !== "normal") return state;
      return {
        ...state,
        mode: "playback-progress",
      };
    }
    case "PAUSE_PLAYBACK": {
      if (state.mode !== "playback-progress") return state;

      return {
        ...state,
        mode: "playback-pause",
      };
    }
    case "CONTINUE_PLAYBACK": {
      if (state.mode !== "playback-pause") return state;
      return {
        ...state,
        mode: "playback-progress",
      };
    }
    case "STOP_PLAYBACK": {
      if (state.mode !== "playback-progress" && state.mode !== "playback-pause")
        return state;
      return {
        ...state,
        mode: "normal",
      };
    }
    case "BEAT": {
      if (state.mode !== "recording-progress") return state;
      return {
        ...state,
        recording: {
          ...state.recording,
          beats: [...state.recording.beats, action.data],
        },
      };
    }
    default:
      return state;
  }
};
