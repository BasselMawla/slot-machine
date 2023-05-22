import * as PIXI from "./pixi.mjs";
import Coords from "./coords.js";

export default class Reel extends PIXI.Container {
  constructor(xCoord, symbolTextures, parent) {
    super();
    this.x = xCoord;

    this.buildSymbols(symbolTextures);
    this.addMask(parent);
  }

  // Add a mask to the reel to hide the sections outside the visible reel window
  addMask(parent) {
    const reelBounds = new PIXI.Graphics();
    // TODO: Figure out why beginFill works with any params
    reelBounds.beginFill();
    reelBounds.drawRect(
      this.x - this.width / 2,
      this.y - this.height / 2 + 101,
      this.width,
      this.height - 124
    );
    reelBounds.endFill();

    this.mask = reelBounds;
    parent.addChild(reelBounds);
  }

  // Add the three symbols to the reel
  buildSymbols(symbolTextures) {
    for (let i = 0; i < symbolTextures.length; i++) {
      const symbol = new PIXI.Sprite(symbolTextures[i]);
      symbol.anchor.set(0.5);
      this.addChild(symbol);

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
