import * as PIXI from "./pixi.mjs";
import Coords from "./coords.js";
import Textures from "./textures.js";

export default class Reel extends PIXI.Container {
  symbols = [];

  /* xCoord: x coordinate of the reel
     symbolTextures: array of the textures of the 3 symbols in the reel
     parent: parent to which to attach this reel
  */
  constructor(xCoord, parent) {
    super();
    this.x = xCoord;

    this.buildSymbols(Textures.shuffledSymbols());

    const reelBounds = this.createReelMask();
    this.mask = reelBounds;

    parent.addChild(reelBounds);
    parent.addChild(this);
  }

  // Add the three symbols to the reel
  buildSymbols(symbolTextures) {
    for (let i = 0; i < symbolTextures.length; i++) {
      const symbol = new PIXI.Sprite(symbolTextures[i]);
      symbol.anchor.set(0.5);
      this.symbols.push(symbol);
      this.addChild(symbol);
    }

    this.setSymbolsYCoords(this.children);
  }

  // Create a mask for the reel to hide the sections outside the visible reel window
  createReelMask() {
    const reelBounds = new PIXI.Graphics();
    reelBounds.beginFill();
    reelBounds.drawRect(
      this.x - this.width / 2,
      this.y - this.height / 2 + 101,
      this.width,
      this.height - 124
    );
    reelBounds.endFill();

    return reelBounds;
  }

  reorder(reelOrderArray) {
    for (let i = 0; i < 3; i++) {
      this.symbols[i].texture = Textures.symbols[reelOrderArray[i]];
    }
  }

  spinReel() {
    this.swapChildren(
      this.getChildAt(Math.floor(Math.random() * 3)),
      this.getChildAt(Math.floor(Math.random() * 3))
    );

    //this.updateTransform();
    this.setSymbolsYCoords(this.children);
  }

  // Set the symbols position depending on where they should appear
  setSymbolsYCoords(symbolSprites) {
    for (let i = 0; i < symbolSprites.length; i++) {
      const symbol = symbolSprites[i];

      // Set y coordinate of the symbol based on i
      switch (i) {
        case 0:
          symbol.y = Coords.symbolCoords.yTop;
          break;
        case 1:
          symbol.y = Coords.symbolCoords.yMiddle;
          break;
        default: // case 2
          symbol.y = Coords.symbolCoords.yBottom;
          break;
      }
    }
  }
}
