import * as PIXI from "./pixi.mjs";

export default class Textures {
  static symbols;
  static slotMachineTexture;

  static async loadTextures() {
    Textures.symbols = [
      await PIXI.Assets.load("sprites/symbol-bell.png"),
      await PIXI.Assets.load("sprites/symbol-cherry.png"),
      await PIXI.Assets.load("sprites/symbol-seven.png"),
    ];

    Textures.slotMachine = await PIXI.Assets.load("sprites/slot-machine.png");

    Textures.lever = {
      initial: await PIXI.Assets.load("sprites/lever-initial.png"),
      pulled: await PIXI.Assets.load("sprites/lever-pulled.png"),
    };

  }

  static shuffledSymbols() {
    return Textures.symbols; //Textures.symbols.sort((a, b) => 0.5 - Math.random());
  }
}
