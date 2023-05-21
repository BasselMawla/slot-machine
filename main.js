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

const symbolTextures = {
  symbol1: PIXI.Texture.from("sprites/slot-symbol1.png"),
  symbol2: PIXI.Texture.from("sprites/slot-symbol2.png"),
  symbol3: PIXI.Texture.from("sprites/slot-symbol3.png"),
};

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
  let index = 0;
  for (const texture of Object.values(symbolTextures)) {
    const symbol = new PIXI.Sprite(texture);
    symbol.anchor.set(0.5);
    reel.addChild(symbol);
    //reel.children.push(symbol);
    console.log(symbol.height);

    // Set y coordinate of the symbol based on index
    switch (index) {
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

    reelsList.push(reel);
    slotMachine.addChild(reel);
    index++;
  }
}

app.stage.addChild(slotMachine);
