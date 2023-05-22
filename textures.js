import * as PIXI from "./pixi.mjs";

export default class Textures {
  static symbolTextures = [
    PIXI.Texture.from("sprites/slot-symbol1.png"),
    PIXI.Texture.from("sprites/slot-symbol2.png"),
    PIXI.Texture.from("sprites/slot-symbol3.png"),
  ];

  static shuffledSymbols() {
    return Textures.symbolTextures.sort((a, b) => 0.5 - Math.random());
  }
}
