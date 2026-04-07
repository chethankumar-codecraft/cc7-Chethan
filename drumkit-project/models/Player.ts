export type Beat = { timeStamp: number; key: string };
export type Recording = Beat[];
export type Listener = (beatIndex: number, totalBeats: number) => void;

export type Timeout = ReturnType<typeof setTimeout>; // ReturnType helps you to derive the return type of a function.

export class Player {
  listeners: Listener[] = [];
  scheduledPlaybackTimers: Timeout[] = [];

  beatIndex: number = 0;

  get totalBeats() {
    return this.recording.length;
  }
  constructor(
    private recording: Recording,
    private playback: (beat: Beat) => void,
  ) {}

  subscribe(listener: Listener) {
    this.listeners.push(listener);
  }

  unsubscribe(listener: Listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  notify() {
    this.listeners.forEach((l) => l(this.beatIndex, this.totalBeats));
  }

  play() {
    // Should normalise the beats, and setup playback timers
    // 1. normalise beats
    //this.normaliseBeats(this.beats);
    // 2. Create timers for all beats from beat starting current beat index onwards
    // in the timer callback, to play the beat, call playback that was passed in constructor.

    const normalisedBeats = this.normaliseBeats();
    if (normalisedBeats.length === 0) return;

    const baseTime = normalisedBeats[this.beatIndex]?.timeStamp ?? 0;
    for (let i = this.beatIndex; i < normalisedBeats.length; i++) {
      const beat = normalisedBeats[i];
      if (!beat) continue;
      const delay = beat.timeStamp - baseTime;

      const timeReference = setTimeout(() => {
        this.playback(beat);
        if (this.beatIndex === normalisedBeats.length - 1) this.beatIndex = 0;
        else this.beatIndex = i + 1; //if user pause maintaining next index to start if continue is clicked

        this.notify();
      }, delay);
      this.scheduledPlaybackTimers.push(timeReference);
    }
  }
  normaliseBeats() {
    const normalise: Recording = [];
    if (this.recording.length == 0) return normalise;
    let delay = 0;

    for (let i = 0; i < this.totalBeats; i++) {
      const currentBeat = this.recording[i]; // it stores the reference of the beat
      const previousBeat = this.recording[i - 1]; //i need original previous value bcs normalise changed that value
      let normaliseTime: number;
      if (!currentBeat) continue;
      if (i == 0 && currentBeat.key !== "PAUSED") {
        normalise.push({ key: currentBeat.key, timeStamp: 0 });
        continue;
      }
      if (!previousBeat) continue; //to avoid typescript error

      if (currentBeat.key === "PAUSED") {
        delay += currentBeat.timeStamp - previousBeat.timeStamp;
        continue;
      }
      if (previousBeat.key === "PAUSED") {
        normaliseTime =
          delay + (normalise[normalise.length - 1]?.timeStamp ?? 0);
      } else
        normaliseTime =
          currentBeat.timeStamp -
          previousBeat.timeStamp +
          (normalise[normalise.length - 1]?.timeStamp ?? 0);
      normalise.push({
        key: currentBeat.key,
        timeStamp: normaliseTime,
      });
      delay = 0;
    }
    return normalise;
  }

  //it is made for progress bar to get the duration after normalization
  getTotalPlaybackDuration() {
    const normalised = this.normaliseBeats();
    if (normalised.length === 0) return 0;
    return normalised[normalised.length - 1]!.timeStamp;
  }

  getCurrentBeatTimeStamp(): number {
    const normalised = this.normaliseBeats();
    if (normalised.length === 0) return 0;

    return normalised[this.beatIndex]?.timeStamp ?? 0;
  }

  pause() {
    // We need to clear all the timers in sheduledPlaybackTimers.
    this.scheduledPlaybackTimers.forEach((time) => clearTimeout(time)); //clear all the timers when pause is clicked
    this.scheduledPlaybackTimers = [];
  }
  resume() {
    this.play();
  }
}
