import * as PIXI from "../pixi.min.mjs";
import Textures from "../helpers/textures.js";
import Sounds from "../helpers/sounds.js";
import Lever from "./lever.js";

export default class SlotMachine extends PIXI.Container {
  sprite;
  lever;
  buttons;

  constructor(screenWidth, screenHeight) {
    super();

    // Main slot machine texture
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

    // Lever
    this.lever = new Lever();
    this.sprite.addChild(this.lever);

    // Stake buttons
    // Decrease stake button
    const downButton = new PIXI.Sprite(Textures.arrows.down.initial);
    downButton.anchor.set(0.5);
    downButton.x = -60;
    downButton.y = 197;
    downButton.scale.set(1.5, 1.5);

    downButton.eventMode = "static";
    downButton.cursor = "pointer";

    downButton.on("pointerdown", (event) => {
      downButton.texture = Textures.arrows.down.pushed;
      Sounds.buttonDown.play();
    });

    downButton.on("pointerup", (event) => {
      downButton.texture = Textures.arrows.down.initial;
      Sounds.buttonUp.play();
    });

    this.sprite.addChild(downButton);

    // Increase stake button
    const upButton = new PIXI.Sprite(Textures.arrows.up.initial);
    upButton.anchor.set(0.5);
    upButton.x = 105;
    upButton.y = 202;
    upButton.scale.set(1.5, 1.5);

    upButton.eventMode = "static";
    upButton.cursor = "pointer";

    upButton.on("pointerdown", (event) => {
      upButton.texture = Textures.arrows.up.pushed;
      Sounds.buttonDown.play();
    });

    upButton.on("pointerup", (event) => {
      upButton.texture = Textures.arrows.up.initial;
      Sounds.buttonUp.play();
    });

    this.sprite.addChild(upButton);

    this.buttons = {
      down: downButton,
      up: upButton,
    };
  }
}
