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

let balance = 100;
let stake = 5;

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
  spinMachine();
});

async function spinMachine() {
  try {
    const apiResponse = await fetch("http://localhost:8888/serve", {
      method: "POST",
      headers: {
        "Content-Type": "application/xml",
      },
      body: '<Request balance="' + balance + '" stake="' + stake + '" />',
    });

    const xmlResponse = await apiResponse.text();
    // Not proper XML, an error occured
    if (xmlResponse.charAt(0) != "<") {
      throw "An error occured! Your stake was refunded. Please try again.";
    }
    lever.toggleLever();
    handleSpinResult(xmlResponse);
  } catch (err) {
    console.log();
    console.log(err);
  }

  /*reelsList.forEach((reel) => {
    reel.spinReel();
  });*/
}

function handleSpinResult(xmlResponse) {
  let parsedResponse;
  try {
    parsedResponse = new DOMParser().parseFromString(xmlResponse, "text/xml");
    const result = parsedResponse.getElementsByTagName("Response")[0];

    balance = result.getAttribute("balance");
    const winnings = result.getAttribute("win");

    console.log();
    console.log("You bet: £" + stake);
    if (winnings > 0) {
      console.log("Congratulations! You won £" + winnings + "!");
    }
    console.log("Your new balance is: £" + balance);

    const gridList = result.getElementsByTagName("SymbolGrid");
    for (let i = 0; i < gridList.length; i++) {
      const reelOrderString = gridList[i].getAttribute("symbols");
      const reelOrderArray = reelOrderString.split(",").map(Number);
      reelsList[i].reorder(reelOrderArray);
    }
  } catch (err) {
    // TODO: Show this on the screen
    console.log(err);
    //console.log("An error occured! Your stake was refunded. Please try again.");
  }
}

/* TODO:
  Add lever animation

  Add selectable stake
    Add buttons such as +1 +5 +10 +50 and Reset
  Show current funds

  Add spin animations

  Make only the lever clickable, not the whole screen
  More error checking
*/
