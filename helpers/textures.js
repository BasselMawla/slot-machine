import * as PIXI from "../pixi.min.mjs";

export default class Textures {
  static symbols;
  static slotMachine;
  static lever;
  static arrows;

  static async loadTextures() {
    Textures.symbols = [
      await PIXI.Assets.load("sprites/symbols/symbol-bell.png"),
      await PIXI.Assets.load("sprites/symbols/symbol-cherry.png"),
      await PIXI.Assets.load("sprites/symbols/symbol-seven.png"),
    ];

    Textures.slotMachine = await PIXI.Assets.load("sprites/slot-machine.png");

    Textures.lever = {
      initial: await PIXI.Assets.load("sprites/lever/lever-initial.png"),
      pulled: await PIXI.Assets.load("sprites/lever/lever-pulled.png"),
    };

    Textures.arrows = {
      down: {
        initial: await PIXI.Assets.load("sprites/arrows/down-arrow.png"),
        pushed: await PIXI.Assets.load("sprites/arrows/down-arrow-pushed.png"),
      },
      up: {
        initial: await PIXI.Assets.load("sprites/arrows/up-arrow.png"),
        pushed: await PIXI.Assets.load("sprites/arrows/up-arrow-pushed.png"),
      },
    };
  }
}
