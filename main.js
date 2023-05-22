import * as PIXI from "./pixi.mjs";
import Reel from "./reel.js";
import Coords from "./coords.js";
import Textures from "./textures.js";
import Lever from "./lever.js";

const app = new PIXI.Application({
  backgroundColor: 0x1099bb,
  width: window.innerWidth,
  height: window.innerHeight,
});
document.body.appendChild(app.view);

await Textures.loadTextures();

// Set up the background slot machine sprite
const slotMachine = new PIXI.Sprite(Textures.slotMachine);
slotMachine.anchor.set(0.5);
slotMachine.x = app.screen.width / 2;
slotMachine.y = app.screen.height / 2;
slotMachine.scale.set(
  Math.min(
    app.screen.width / slotMachine.texture.width,
    app.screen.height / slotMachine.texture.height
  )
);
app.stage.addChild(slotMachine);

// Create the three reels
const reelsList = [
  new Reel(Coords.reelCoords.xLeft, slotMachine),
  new Reel(Coords.reelCoords.xMiddle, slotMachine),
  new Reel(Coords.reelCoords.xRight, slotMachine),
];

const lever = new Lever();
slotMachine.addChild(lever);

lever.eventMode = "static";
lever.on("pointerdown", (event) => {
  lever.toggleLever();
  spinMachine();
});

async function spinMachine() {
  const apiResponse = await fetch("http://localhost:8888/serve", {
    method: "POST",
    headers: {
      "Content-Type": "application/xml",
    },
    body: '<Request balance="100.00" stake="1.20" />',
  });

  const xmlResponse = await apiResponse.text();
  // TODO: error check here
  const parsedResponse = new DOMParser().parseFromString(
    xmlResponse,
    "text/xml"
  );
  const result = parsedResponse.getElementsByTagName("Response")[0];
  const newBalance = result.getAttribute("balance");
  const winnings = result.getAttribute("win");

  const gridList = result.getElementsByTagName("SymbolGrid");
  const newOrderList = [];
  for (let i = 0; i < gridList.length; i++) {
    const orderString = gridList[i].getAttribute("symbols");
    const orderArray = orderString.split(",").map(Number);
    newOrderList.push(orderArray);
  }
  // TODO: Reorder the symbols in each reel to match the newOrderList order
  // TODO: Add stakes and get new balance and results from XML too

  reelsList.forEach((reel) => {
    reel.spinReel();
  });
}

/* TODO:
  Add lever and draw it
  Make lever clickable
  on-click run buildSymbols again for each reel
  Spin the reels when lever is clicked without animation
  Add selectable stake
  Add current funds
  Make funds lose stake and gain rewards
  --DONE-- Mask edge symbols

  Add spin animations
  Add lever animation
*/
