import * as PIXI from "./pixi.mjs";
import Textures from "./textures.js";

export default class Lever extends PIXI.Container {
  leverSprite;
  isPulled;

  constructor() {
    super();
    this.leverSprite = new PIXI.Sprite(Textures.leverInitial);
    this.leverSprite.anchor.set(0.5);
    this.addChild(this.leverSprite);
    this.isPulled = false;
  }

  toggleLever() {
    if (this.isPulled) {
      this.returnLever();
    } else {
      this.pullLever();
    }
  }

  pullLever() {
    this.leverSprite.texture = Textures.leverPulled;
    this.isPulled = true;
  }

  returnLever() {
    this.leverSprite.texture = Textures.leverInitial;
    this.isPulled = false;
  }
}
