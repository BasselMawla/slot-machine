import * as PIXI from "../pixi.mjs";

// Create sound effects using the howler.js library
export default class Sounds {
  static leverPull;
  static buttonDown;
  static buttonUp;

  static loadSounds() {
    Sounds.leverPull = new Howl({
      src: ["../sounds/lever-pull.wav"],
      preload: true,
      volume: 0.4,
    });

    Sounds.buttonDown = new Howl({
      src: ["../sounds/button-down.wav"],
      preload: true,
    });

    Sounds.buttonUp = new Howl({
      src: ["../sounds/button-up.wav"],
      preload: true,
    });
  }
}
