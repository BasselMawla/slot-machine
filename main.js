import * as PIXI from "./pixi.mjs";

const app = new PIXI.Application({
  backgroundColor: 0x1099bb,
  width: window.innerWidth,
  height: window.innerHeight,
});

await PIXI.Assets.load([
  "sprites/slot-machine1.png",
  "sprites/slot-symbol1.png",
]);

document.body.appendChild(app.view);

PIXI.BaseTexture.defaultOptions.scaleMode = PIXI.SCALE_MODES.NEAREST;

const slotMachine = PIXI.Sprite.from("sprites/slot-machine1.png");
slotMachine.anchor.set(0.5);
slotMachine.x = app.screen.width / 2;
slotMachine.y = app.screen.height / 2;
slotMachine.scale.set(
  Math.min(
    app.screen.width / slotMachine.texture.width,
    app.screen.height / slotMachine.texture.height
  )
);

const symbolCoords = {
  firstX: -125,
  secondX: 5,
  thirdX: 135,
  y: 40,
};

const symbol1 = PIXI.Sprite.from("sprites/slot-symbol1.png");
slotMachine.addChild(symbol1);
symbol1.anchor.set(0.5);
symbol1.x = symbolCoords.firstX;
symbol1.y = symbolCoords.y;
console.log(slotMachine.x);

app.stage.addChild(slotMachine);
