import {
  drumkitReducer,
  type DrumState,
  type Action,
  type Beat,
} from "../models/reducer.ts";
import { Player } from "../models/Player.ts";

let state: DrumState = {
  mode: "normal",
  recording: {
    name: "Recent",
    beats: [],
  },
};

const recordBtn = document.getElementById("record") as HTMLButtonElement;
const pauseBtn = document.getElementById("pause") as HTMLButtonElement;
const playRecordingBtn = document.getElementById(
  "playRecording",
) as HTMLButtonElement;
const pausePlaybackBtn = document.getElementById(
  "pausePlayback",
) as HTMLButtonElement;
const statusDiv = document.getElementById("record-msg") as HTMLElement;
const progressBar = document.getElementById("progress-bar") as HTMLElement;
const progressContainer = document.querySelector(
  ".progress-container",
) as HTMLElement;
const playbackstatus = document.getElementById("record-status") as HTMLElement;
const clearRecordingBtn = document.getElementById(
  "clearRecording",
) as HTMLButtonElement;
const confirmDialog = document.getElementById(
  "confirmDialog",
) as HTMLDialogElement;
const confirmYes = document.getElementById("confirmYes") as HTMLButtonElement;
const confirmNo = document.getElementById("confirmNo") as HTMLButtonElement;
const editDialog = document.getElementById("editDialog") as HTMLDialogElement;
const editKeyInput = document.getElementById("editKey") as HTMLInputElement;
const editSoundSelect = document.getElementById(
  "editSound",
) as HTMLSelectElement;
const saveEditBtn = document.getElementById("saveEdit") as HTMLButtonElement;
const keysContainer = document.querySelector(".keys") as HTMLElement;
const editKeysBtn = document.getElementById("edit-keys") as HTMLButtonElement;
const resetKeysBtn = document.getElementById("resetKeys") as HTMLButtonElement;
const addKeyBtn = document.getElementById("addKey") as HTMLButtonElement;
const keyWarning = document.getElementById("key-warning-msg") as HTMLDivElement;
//confirm dialog custom
const confirmMessage = document.getElementById("confirmMessage") as HTMLElement;
const deleteKeyBtn = document.getElementById("deleteKey") as HTMLButtonElement;
const cancelEditBtn = document.getElementById(
  "cancelEdit",
) as HTMLButtonElement;
//dispatch function
function dispatch(action: Action) {
  state = drumkitReducer(state, action);
  updateUI();
}

type DrumConfig = {
  key: string;
  sound: string;
  label: string;
};
let drumKeys: DrumConfig[] = [];
let keyBindings: Record<string, DrumConfig> = {};
//load default config
const loadConfig = async () => {
  const data = await fetch("/drumkitConfig.json");
  drumKeys = await data.json();
  keyBindings = Object.fromEntries(
    drumKeys.map(
      (item) => [item.key, item], //key and object(key,sound,label)
    ),
  );
  renderKeys();
  updateUI();
};
//creating element
function createKeyElement(item: DrumConfig): HTMLElement {
  const div = document.createElement("div");
  div.classList.add("key");
  div.dataset.key = item.key;

  const kbd = document.createElement("kbd");
  kbd.textContent = item.key;

  const sound = document.createElement("span");
  sound.className = "sound";
  sound.textContent = item.label;

  const edit = document.createElement("span");
  edit.className = "edit-hint";
  edit.textContent = "✏️";
  div.addEventListener("transitionend", removeTransition);
  div.append(kbd, sound, edit);
  return div;
}

let selectedKey: DrumConfig | null = null;
const renderKeys = () => {
  keysContainer.innerHTML = "";
  drumKeys.forEach((item) => {
    const div = createKeyElement(item);
    //editing
    div.addEventListener("click", () => {
      if (state.mode !== "edit") return;
      selectedKey = item;
      editKeyInput.value = item.key;
      editSoundSelect.value = item.sound;
      editDialog.showModal();
    });
    keysContainer.appendChild(div);
  });
};

//Custom key edit
editKeysBtn.addEventListener("click", () => {
  if (state.mode === "normal") {
    dispatch({ type: "OPEN_EDIT" });
  } else if (state.mode === "edit") {
    dispatch({ type: "CLOSE_EDIT" });
    updateUI();
  }
});
addKeyBtn.addEventListener("click", () => {
  if (state.mode !== "edit") return;
  editDialog.classList.add("is-adding");
  // Check if we reached the limit
  if (drumKeys.length >= 20) {
    alert(`Limit reached! You can only have ${20} keys.`);
    return;
  }
  selectedKey = null;
  editKeyInput.value = "";
  editSoundSelect.selectedIndex = 0;
  editDialog.showModal();
});

saveEditBtn.addEventListener("click", () => {
  const newKey = editKeyInput.value.toUpperCase();
  const duplicate = drumKeys.find(
    (i) => i.key.toUpperCase() === newKey && i !== selectedKey,
  );
  if (!newKey) {
    keyWarning.textContent = "Key cannot be empty";
    keyWarning.style.visibility = "visible";
    return;
  }
  if (duplicate) {
    keyWarning.textContent = `Key "${newKey}" is already used by ${duplicate.label}`;
    keyWarning.style.visibility = "visible";
    editKeyInput.classList.add("input-error");
    return;
  }
  const selectedOption = editSoundSelect.selectedOptions[0];
  if (!selectedOption) return;

  if (!selectedKey) {
    drumKeys.push({
      key: newKey,
      sound: selectedOption.value,
      label: selectedOption.text,
    });
  } else {
    selectedKey.key = newKey;
    selectedKey.sound = selectedOption.value;
    selectedKey.label = selectedOption.text;
  }
  keyBindings = Object.fromEntries(drumKeys.map((i) => [i.key, i]));
  renderKeys();
  editDialog.classList.remove("is-adding");
  editDialog.close();
});

//passing callback for confirm button
let confirmCallback: (() => void) | null = null;
function openConfirm(message: string, onConfirm: () => void) {
  confirmMessage.textContent = message;
  confirmCallback = onConfirm;
  confirmDialog.showModal();
}
confirmYes.addEventListener("click", () => {
  if (confirmCallback) confirmCallback();
  confirmDialog.close();
  confirmCallback = null;
});
confirmNo.addEventListener("click", () => {
  confirmDialog.close();
  confirmCallback = null;
});
cancelEditBtn.addEventListener("click", () => {
  editDialog.close();
  editDialog.classList.remove("is-adding");
});
deleteKeyBtn.addEventListener("click", () => {
  if (!selectedKey) return;
  openConfirm(
    `Are you sure you want to delete key "${selectedKey.key}"?`,
    () => {
      drumKeys = drumKeys.filter((i) => i !== selectedKey);
      keyBindings = Object.fromEntries(drumKeys.map((i) => [i.key, i]));
      renderKeys();
      updateUI();
      editDialog.close();
    },
  );
});
resetKeysBtn.addEventListener("click", () => {
  if (state.mode !== "edit") return;

  openConfirm("Reset all keys to default?", async () => {
    await loadConfig();
    dispatch({ type: "CLOSE_EDIT" });
    updateUI();
  });
});

const removeTransition = (e: TransitionEvent) => {
  if (e.propertyName !== "transform") return;
  const element = e.target as HTMLElement;
  element.classList.remove("playing");
};
//Transition CSS for button when they play
function playSound(key: string) {
  const drum = keyBindings[key];
  if (!drum) return;
  const keyelement = document.querySelector(
    `.key[data-key="${key}"]`,
  ) as HTMLElement;
  if (keyelement) {
    keyelement.classList.add("playing");
  }
  const audio = new Audio(drum.sound);
  audio.currentTime = 0;
  audio.play();
}
editDialog.addEventListener("close", () => {
  keyWarning.style.visibility = "hidden";
  editKeyInput.classList.remove("input-error");
});
//when each key pressed
window.addEventListener("keydown", (pressedKey) => {
  if (state.mode === "edit") return;
  const key = pressedKey.key.toUpperCase();
  //prevent play song during the editing
  const target = pressedKey.target as HTMLElement;
  if (target.tagName === "INPUT" || target.tagName === "SELECT") return;
  if (state.mode === "recording-progress") {
    dispatch({
      type: "BEAT",
      data: { key: key, timeStamp: Date.now() },
    });
  }
  playSound(key);
});

//record button
recordBtn.addEventListener("click", () => {
  if (state.mode === "normal") {
    dispatch({ type: "START_RECORDING" });
  } else {
    dispatch({ type: "STOP_RECORDING" });
  }
});
//pause  and record button of Recordings
pauseBtn.addEventListener("click", () => {
  if (state.mode === "recording-progress") {
    dispatch({
      type: "PAUSE_RECORDING",
      data: { key: "PAUSED", timeStamp: Date.now() },
    });
  }
  //continue
  else {
    dispatch({ type: "CONTINUE_RECORDING" });
  }
});

//-->Playback Recordings
//callback to play beats
const playback = (beat: Beat) => {
  playSound(beat.key);
};
let player: Player;
//playback play
playRecordingBtn.addEventListener("click", () => {
  if (state.mode === "normal") {
    dispatch({ type: "START_PLAYBACK" });
    player = new Player(state.recording.beats, playback);
    player.play();
    player.subscribe(() => {
      updateUI();
      //after completion back to normal state
      if (
        player.beatIndex === player.normaliseBeats().length - 1 &&
        state.mode === "playback-progress"
      ) {
        dispatch({ type: "STOP_PLAYBACK" });
      }
    });
  } else {
    dispatch({ type: "STOP_PLAYBACK" });
    player.pause();
    player.beatIndex = 0;
  }
});

//continue and pause of playback
pausePlaybackBtn.addEventListener("click", () => {
  if (state.mode === "playback-progress") {
    dispatch({ type: "PAUSE_PLAYBACK" });
    player.pause();
  } else if (state.mode === "playback-pause") {
    dispatch({ type: "CONTINUE_PLAYBACK" });
    player.resume();
  }
});
clearRecordingBtn.addEventListener("click", () => {
  openConfirm("Are you sure you want to clear saved recording?", () => {
    dispatch({ type: "CLEAR_RECORDING" });
  });
});

//prpgress bar
function updateProgress() {
  if (!player) return;
  const duration = player.getTotalPlaybackDuration();
  const currentTime = player.getCurrentBeatTimeStamp();
  if (duration === 0) return;
  const percent = Math.min((currentTime / duration) * 100, 100);
  progressBar.style.width = percent + "%";
}

//UI changes
const updateRecordingUI = () => {
  const isRecording = state.mode === "recording-progress";
  const isPaused = state.mode === "recording-pause";
  const isEdit = state.mode === "edit";
  const isPlayback =
    state.mode === "playback-progress" || state.mode === "playback-pause";

  const isBlocked = isEdit || isPlayback;
  // default
  recordBtn.textContent = "START RECORD";
  pauseBtn.disabled = true;
  pauseBtn.textContent = "PAUSE";
  pauseBtn.style.color = "red";
  recordBtn.disabled = false;

  // disable everything if edit or playback
  if (isBlocked) {
    recordBtn.disabled = true;
    pauseBtn.disabled = true;
    return;
  }

  // recording active
  if (isRecording) {
    recordBtn.textContent = "STOP RECORDING";
    pauseBtn.disabled = false;
    pauseBtn.textContent = "PAUSE";
    pauseBtn.style.color = "red";
    return;
  }

  // recording paused
  if (isPaused) {
    pauseBtn.textContent = "CONTINUE";
    pauseBtn.style.color = "#4caf27";
    pauseBtn.disabled = false;
    return;
  }
};
const updatePlaybackUI = () => {
  const isRecord =
    state.mode === "recording-progress" || state.mode === "recording-pause";
  const isEdit = state.mode === "edit";
  const isPlayingPlayback = state.mode === "playback-progress";
  const isPausedPlayback = state.mode === "playback-pause";
  const hasBeats =
    state.recording.beats.filter((b) => b.key !== "PAUSED").length > 0;
  playbackstatus.hidden = true;
  progressContainer.hidden = true;
  pausePlaybackBtn.disabled = true;
  pausePlaybackBtn.textContent = "PAUSE";
  pausePlaybackBtn.style.color = "red";
  playRecordingBtn.textContent = "PLAY RECORDING";
  playRecordingBtn.style.color = "white";
  if (isRecord || isEdit) {
    playRecordingBtn.disabled = true;
    clearRecordingBtn.disabled = true;
    return;
  }
  playRecordingBtn.disabled = !hasBeats;
  clearRecordingBtn.disabled = !hasBeats;

  if (isPlayingPlayback) {
    playRecordingBtn.textContent = "STOP PLAYING";
    playRecordingBtn.style.color = "red";
    progressContainer.hidden = false;
    pausePlaybackBtn.disabled = false;
  }

  if (isPausedPlayback) {
    pausePlaybackBtn.disabled = false;
    progressContainer.hidden = false;
    playRecordingBtn.textContent = "STOP PLAYING";
    playRecordingBtn.style.color = "red";
    pausePlaybackBtn.textContent = "CONTINUE";
    pausePlaybackBtn.style.color = "#4caf27";
  }
};
const updateEditKeysUI = () => {
  const isEdit = state.mode === "edit";
  const isInteractive = state.mode === "normal" || isEdit;
  editKeysBtn.textContent = isEdit ? "SAVE & CLOSE" : "EDIT KEYS";

  addKeyBtn.disabled = !isEdit || drumKeys.length >= 20;
  resetKeysBtn.disabled = !isEdit;
  editKeysBtn.disabled = !isInteractive;

  document.querySelectorAll<HTMLElement>(".key").forEach((keyEl) => {
    keyEl.classList.toggle("inactive", !isInteractive);
  });
};
function updateUI() {
  document.body.classList.toggle("edit-mode", state.mode === "edit");
  statusDiv.textContent = state.mode.toUpperCase() + " STATE";
  updateProgress();
  updatePlaybackUI();
  updateRecordingUI();
  updateEditKeysUI();
}
loadConfig();
