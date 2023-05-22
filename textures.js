import * as PIXI from "./pixi.mjs";

export default class Textures {
  static symbolTextures;
  static slotMachineTexture;

  static async loadTextures() {
    Textures.symbols = [
      await PIXI.Assets.load("sprites/symbol-bell.png"),
      await PIXI.Assets.load("sprites/symbol-cherry.png"),
      await PIXI.Assets.load("sprites/symbol-seven.png"),
    ];

    Textures.slotMachine = await PIXI.Assets.load("sprites/slot-machine.png");

    Textures.leverInitial = await PIXI.Assets.load("sprites/lever-initial.png");

    Textures.leverPulled = await PIXI.Assets.load("sprites/lever-pulled.png");
  }

  static shuffledSymbols() {
    return Textures.symbols.sort((a, b) => 0.5 - Math.random());
  }
}
