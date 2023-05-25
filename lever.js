import * as PIXI from "./pixi.mjs";
import Textures from "./textures.js";
import app from "./main.js";

export default class Lever extends PIXI.Container {
  leverSprite;
  isPulled;
  static elapsedTime = 0.0;

  constructor() {
    super();
    this.leverSprite = new PIXI.Sprite(Textures.leverInitial);
    this.leverSprite.anchor.set(0.5);
    this.addChild(this.leverSprite);
    this.isPulled = false;
  }

  // Animate the lever being pulled and returning to its initial position
  // Uses TweenJS for the animation
  pullLever() {
    this.leverSprite.texture = Textures.leverPulled;
    app.ticker.add(Lever.animateLever, this);
  }

  static animateLever(delta) {
    if (Lever.elapsedTime > 500) {
      this.leverSprite.texture = Textures.leverInitial;
      app.ticker.remove(Lever.animateLever, this);
      Lever.elapsedTime = 0.0;
    }

    Lever.elapsedTime += app.ticker.elapsedMS;
  }
}
