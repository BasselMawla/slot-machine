import * as PIXI from "../pixi.mjs";
import Coords from "../helpers/coords.js";
import Textures from "../helpers/textures.js";

export default class SlotMachine extends PIXI.Container {
  sprite;

  constructor(screenWidth, screenHeight) {
    super();
    this.sprite = new PIXI.Sprite(Textures.slotMachine);
    this.sprite.anchor.set(0.5);
    this.sprite.x = screenWidth / 2;
    this.sprite.y = screenHeight / 2;
    this.sprite.scale.set(
      Math.min(
        screenWidth / this.sprite.texture.width,
        screenHeight / this.sprite.texture.height
      )
    );
    this.addChild(this.sprite);
  }
}
