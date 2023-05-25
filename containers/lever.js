import * as PIXI from "../pixi.min.mjs";
import app from "../main.js";
import Textures from "../helpers/textures.js";
import Sounds from "../helpers/sounds.js";

export default class Lever extends PIXI.Container {
  sprite;
  extraFrameSprites;
  isPulled;
  hitAreaCircle;
  static elapsedTime = 0;
  static animTime = 540;
  static extraFrameTime = 50;
  static pullSound;

  constructor() {
    super();
    this.isPulled = false;

    this.sprite = new PIXI.Sprite(Textures.lever.initial);
    this.sprite.anchor.set(0.5);
    // Make only the red handle of the lever interactable
    this.hitArea = new PIXI.Circle(311, 30, 48);
    this.addChild(this.sprite);

    this.eventMode = "static";
    this.cursor = "pointer";

    // Add an in between frame for the lever pulling animation.
    // A combination of both lever textures each with 0.5 alpha.
    this.extraFrameSprites = [
      new PIXI.Sprite(Textures.lever.initial),
      new PIXI.Sprite(Textures.lever.pulled),
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
    this.sprite.texture = Textures.lever.pulled;
    app.ticker.add(Lever.animateLever, this);

    Sounds.leverPull.play();
  }

  showExtraFrame() {
    for (let i = 0; i < this.extraFrameSprites.length; i++) {
      this.extraFrameSprites[i].visible = true;
    }
    this.sprite.visible = false;
  }

  hideExtraFrame() {
    for (let i = 0; i < this.extraFrameSprites.length; i++) {
      this.extraFrameSprites[i].visible = false;
    }
    this.sprite.visible = true;
  }

  // Animate the lever being pulled and returning to its initial position
  static animateLever(delta) {
    // Lever is returned, hide extra frame and stop animating the lever.
    if (Lever.elapsedTime > Lever.animTime + Lever.extraFrameTime) {
      this.hideExtraFrame();
      app.ticker.remove(Lever.animateLever, this);
      Lever.elapsedTime = 0;
      return;
    }
    // Lever is returning. Show extra frame.
    else if (Lever.elapsedTime > Lever.animTime) {
      this.showExtraFrame();
      this.sprite.texture = Textures.lever.initial;
    }
    // Lever is now pulled. Hide extra frame.
    else if (Lever.elapsedTime > Lever.extraFrameTime) {
      this.hideExtraFrame();
    }
    Lever.elapsedTime += app.ticker.elapsedMS;
  }
}
