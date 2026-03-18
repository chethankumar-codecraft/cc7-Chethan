/**
 * When the browser is loaded i have to run the function during user click teh keyboard
 */

//For record clicked key and the time
type Recordkeys = {
  key: number;
  time: number;
};

type DrumState = {
  isRecording: boolean;
  keyRecords: Recordkeys[];
  recordStartTime: number;
};

const drumState: DrumState = {
  isRecording: false,
  keyRecords: [],
  recordStartTime: 0,
};

window.addEventListener("keydown", (pressedKey) => {
  //for each key press
  const key = pressedKey.key.toUpperCase().charCodeAt(0);
  platKeys(key);
  if (drumState.isRecording) {
    const time = Date.now() - drumState.recordStartTime;
    drumState.keyRecords.push({ key, time });
  }
});

window.addEventListener("DOMContentLoaded", () => {
  localStorage.removeItem("lastRecording"); // clears previous recording while load
});

/**
 *
 * @param key
 * It gives the css property for particular element user clicked
 */
const platKeys = (key: number) => {
  const audio = document.querySelector(
    `audio[data-key="${key}"]`, //because mentioned data-key in ascii
  ) as HTMLAudioElement;

  const keyelement = document.querySelector(`.key[data-key="${key}"]`);
  keyelement!.classList.add("playing");

  if (!audio) {
    console.log("No audio found for:", key);
    return;
  }
  audio.currentTime = 0;
  audio.play();
};

//remove transition of css
const removeTransition = (e: TransitionEvent) => {
  if (e.propertyName !== "transform") return;

  const element = e.target as HTMLElement;
  element.classList.remove("playing");
};
const allKeys = document.querySelectorAll<HTMLElement>(`.key`);
allKeys.forEach((key) => {
  key.addEventListener("transitionend", removeTransition);
});

//Record button
const recordMsg = document.getElementById("record-msg") as HTMLElement;
const recordButton = document.querySelector("#record") as HTMLElement;
const clearRecord = document.getElementById("clearRecording") as HTMLElement;
recordButton.addEventListener("click", () => {
  recordMsg.hidden = false;
  if (drumState.isRecording || pauseBtn.textContent === "CONTINUE") {
    //when press pause the drum state is not in recording but we need to stop recordings.
    recordMsg.textContent = `Recording Ended...`;
    recordButton.textContent = "RECORD";
    drumState.isRecording = false;
    pauseBtn.hidden = true;
    localStorage.setItem("lastRecording", JSON.stringify(drumState.keyRecords));
    clearRecord.hidden = false;
    pauseBtn.textContent = "PAUSE";
    pauseBtn.classList.remove("continue");
    setTimeout(() => {
      recordMsg.textContent = "";
      recordMsg.hidden = true;
    }, 1000);
  } else {
    recordMsg.textContent = "Recording Started...";
    recordButton.textContent = "RECORDING";
    pauseBtn.hidden = false;
    drumState.isRecording = true;
    drumState.recordStartTime = Date.now();
    drumState.keyRecords = [];
    setTimeout(() => {
      recordMsg.textContent = "";
      recordMsg.hidden = true;
    }, 1000);
  }
});

const showRecording = document.getElementById("showRecording")!;
const statusDiv = document.getElementById("record-status")!;
const progressBar = document.getElementById("progress-bar") as HTMLElement;
const progressContainer = document.querySelector(
  ".progress-container",
) as HTMLElement;
showRecording.addEventListener("click", () => {
  statusDiv.hidden = false;
  const saved = localStorage.getItem("lastRecording");
  if (saved) {
    progressContainer.hidden = false;
    const recordings: Recordkeys[] = JSON.parse(saved);
    const totalDuration = recordings[recordings.length - 1].time;
    statusDiv.textContent = "Playing...";

    //Progress Bar
    const startTime = Date.now();
    progressBar.style.width = "0%"; // reset initial
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percent = Math.min((elapsed / totalDuration) * 100, 100);
      progressBar.style.width = percent + "%";

      if (percent >= 100) {
        clearInterval(interval);
        statusDiv.textContent = "Finished";
        setTimeout(() => {
          statusDiv.hidden = true;
        }, 1000);
      }
    }, 50);
    recordings.forEach((sound) => {
      setTimeout(() => {
        platKeys(sound.key);
      }, sound.time);
    });
  } else {
    statusDiv.textContent = "No recording yet";
    setTimeout(() => {
      statusDiv.hidden = true;
    }, 1000);
  }
});

//initial load i dont need any recordings

//Pause Key and continue
const pauseBtn = document.querySelector(".pause") as HTMLElement;
pauseBtn.addEventListener("click", () => {
  if (drumState.isRecording) {
    drumState.isRecording = false;
    pauseBtn.textContent = "CONTINUE";
    pauseBtn.classList.add("continue");
  } else {
    pauseBtn.textContent = "PAUSE";
    pauseBtn.classList.remove("continue");
    drumState.isRecording = true;
  }
});

// clear button
const clearBtn = document.getElementById("clearRecording") as HTMLElement;
clearBtn.addEventListener("click", () => {
  localStorage.removeItem("lastRecording");
  drumState.keyRecords = [];
  setTimeout(() => {
    statusDiv.textContent = "Recording cleared";
    clearRecord.hidden = true;
    progressContainer.hidden = true;
  }, 1000);
});
