import * as PIXI from "./pixi.mjs";

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

const symbolTextures = [
  PIXI.Texture.from("sprites/slot-symbol1.png"),
  PIXI.Texture.from("sprites/slot-symbol2.png"),
  PIXI.Texture.from("sprites/slot-symbol3.png"),
];

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
  xLeft: -125,
  xMiddle: 5,
  xRight: 135,
  yTop: -75,
  yMiddle: 40,
  yBottom: 163,
};

// Create the three reels
const reelsList = [];

for (let i = 0; i < 3; i++) {
  const reel = new PIXI.Container();
  //reel.anchor.set(0.5);

  // Set x coordinate of reelContainer based on i
  switch (i) {
    case 0:
      reel.x = symbolCoords.xLeft;
      break;
    case 1:
      reel.x = symbolCoords.xMiddle;
      break;
    default: // case 2
      reel.x = symbolCoords.xRight;
      break;
  }

  //const reel = {
  //  container: reelContainer,
  //  children: [],
  //};

  // 3 symbols in each reel
  symbolTextures.sort((a, b) => 0.5 - Math.random()); // Shuffle the textures#
  for (let j = 0; j < symbolTextures.length; j++) {
    const symbol = new PIXI.Sprite(symbolTextures[j]);
    symbol.anchor.set(0.5);
    reel.addChild(symbol);

    // Set y coordinate of the symbol based on j
    switch (j) {
      case 0:
        symbol.y = symbolCoords.yTop;
        break;
      case 1:
        symbol.y = symbolCoords.yMiddle;
        break;
      default: // case 2
        symbol.y = symbolCoords.yBottom;
        break;
    }
  }
  reelsList.push(reel);
  slotMachine.addChild(reel);
}

app.stage.addChild(slotMachine);
