import * as PIXI from "./pixi.mjs";
import Textures from "./textures.js";
import app from "./main.js";

export default class Lever extends PIXI.Container {
  leverSprite;
  extraFrameSprites;
  isPulled;
  static elapsedTime = 0.0;
  static animTime = 500;
  static extraFrameTime = 50;

  constructor() {
    super();

    this.isPulled = false;

    this.leverSprite = new PIXI.Sprite(Textures.leverInitial);
    this.leverSprite.anchor.set(0.5);
    this.addChild(this.leverSprite);

    // Add an in between frame for the lever pulling animation
    // A combination of both lever textures each with 50% alpha
    this.extraFrameSprites = [
      new PIXI.Sprite(Textures.leverInitial),
      new PIXI.Sprite(Textures.leverPulled),
    ];
    for (let i = 0; i < this.extraFrameSprites.length; i++) {
      this.extraFrameSprites[i].anchor.set(0.5);
      this.extraFrameSprites[i].alpha = 0.5;
      this.extraFrameSprites[i].visible = false;
      this.addChild(this.extraFrameSprites[i]);
    }
  }

  // Start pulling the lever and show extra frame
  pullLever() {
    this.showExtraFrame();
    this.leverSprite.texture = Textures.leverPulled;
    app.ticker.add(Lever.animateLever, this);
  }

  showExtraFrame() {
    for (let i = 0; i < this.extraFrameSprites.length; i++) {
      this.extraFrameSprites[i].visible = true;
    }
    this.leverSprite.visible = false;
  }

  hideExtraFrame() {
    for (let i = 0; i < this.extraFrameSprites.length; i++) {
      this.extraFrameSprites[i].visible = false;
    }
    this.leverSprite.visible = true;
  }

  // Animate the lever being pulled and returning to its initial position
  static animateLever(delta) {
    // Lever is returned, hide extra frame and stop animating the lever.
    if (Lever.elapsedTime > Lever.animTime + Lever.extraFrameTime) {
      this.hideExtraFrame();
      app.ticker.remove(Lever.animateLever, this);
      Lever.elapsedTime = 0;
    }
    // Lever is returning. Show extra frame.
    else if (Lever.elapsedTime > Lever.animTime) {
      this.showExtraFrame();
      this.leverSprite.texture = Textures.leverInitial;
    }
    // Lever is now pulled. Hide extra frame.
    else if (Lever.elapsedTime > Lever.extraFrameTime) {
      this.hideExtraFrame();
    }

    Lever.elapsedTime += app.ticker.elapsedMS;
  }
}
