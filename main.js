import * as PIXI from "./pixi.mjs";
import Reel from "./reel.js";
import Coords from "./coords.js";
import Textures from "./textures.js";

const app = new PIXI.Application({
  backgroundColor: 0x1099bb,
  width: window.innerWidth,
  height: window.innerHeight,
});

await PIXI.Assets.load([
  "sprites/slot-machine1.png",
  "sprites/slot-symbol1.png",
  "sprites/slot-symbol2.png",
  "sprites/slot-symbol3.png",
]);

document.body.appendChild(app.view);

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

// Create the three reels
const reelsList = [
  new Reel(Coords.reelCoords.xLeft, Textures.shuffledSymbols(), slotMachine),
  new Reel(Coords.reelCoords.xMiddle, Textures.shuffledSymbols(), slotMachine),
  new Reel(Coords.reelCoords.xRight, Textures.shuffledSymbols(), slotMachine),
];

reelsList.forEach((reel) => {
  slotMachine.addChild(reel);
});

app.stage.addChild(slotMachine);

/* TODO:
  Add handle and draw it
  Make handle clickable
  on-click run buildSymbols again for each reel
  Spin the reels when handle is clicked without animation
  Add selectable stake
  Add current funds
  Make funds lose stake and gain rewards
  --DONE-- Mask edge symbols

  Add spin animations
  Add handle animation
*/
