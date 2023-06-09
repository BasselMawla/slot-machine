import * as PIXI from "./pixi.min.mjs";
import Textures from "./helpers/textures.js";
import Sounds from "./helpers/sounds.js";
import Coords from "./helpers/coords.js";
import TextHandler from "./helpers/textHandler.js";
import SlotMachine from "./containers/slotMachine.js";
import Reel from "./containers/reel.js";
import Lever from "./containers/lever.js";

const app = new PIXI.Application({
  backgroundColor: 0x1099bb,
  width: window.innerWidth,
  height: window.innerHeight,
});
export default app;

document.body.appendChild(app.view);

await Textures.loadTextures();
await Sounds.loadSounds();

let balance = 100;
let stake = 5;
let totalWinnings = 0;
let isSpinning = false;

// Set up the slot machine sprite
const slotMachine = new SlotMachine(app.screen.width, app.screen.height);
app.stage.addChild(slotMachine);

slotMachine.buttons.up.on("pointerup", (event) => {
  stake += 5;
  TextHandler.updateStake(stake);
});

slotMachine.buttons.down.on("pointerup", (event) => {
  stake = Math.max(0, stake - 5);
  TextHandler.updateStake(stake);
});

// Create the three reels
const reelsList = [
  new Reel(Coords.reelCoords.xLeft, slotMachine.sprite),
  new Reel(Coords.reelCoords.xMiddle, slotMachine.sprite),
  new Reel(Coords.reelCoords.xRight, slotMachine.sprite),
];

// Add text
TextHandler.init(balance, stake);
slotMachine.sprite.addChild(TextHandler.balanceText);
slotMachine.sprite.addChild(TextHandler.stakeText);
slotMachine.sprite.addChild(TextHandler.winningsText);

slotMachine.lever.on("pointerdown", (event) => {
  // elapsedTime is reset to 0 when lever animation is finished
  if (Lever.elapsedTime == 0) {
    isSpinning = false;
  }
  spinMachine();
});

async function spinMachine() {
  // Already spinning
  if (isSpinning) {
    return;
  }
  isSpinning = true;
  try {
    if (stake > balance) {
      throw "Sorry, your balance is too low to play at that stake. Try reducing it.";
    }
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
    slotMachine.lever.pullLever();
    handleSpinResult(xmlResponse);
  } catch (err) {
    console.log();
    console.log(err);
  }
}

function handleSpinResult(xmlResponse) {
  let parsedResponse;
  try {
    parsedResponse = new DOMParser().parseFromString(xmlResponse, "text/xml");
    const result = parsedResponse.getElementsByTagName("Response")[0];

    balance = Number(result.getAttribute("balance"));
    const winnings = Number(result.getAttribute("win"));
    totalWinnings += winnings;

    console.log();
    console.log("You bet: £" + stake);
    if (winnings > 0) {
      // TODO: Show this on as temporary text on the screen
      console.log("Congratulations! You won £" + winnings + "!");
    }
    console.log("Your new balance is: £" + balance);
    TextHandler.updateBalance(balance);
    TextHandler.updateWinnings(totalWinnings);

    const gridList = result.getElementsByTagName("SymbolGrid");
    for (let i = 0; i < gridList.length; i++) {
      const reelOrderString = gridList[i].getAttribute("symbols");
      const reelOrderArray = reelOrderString.split(",").map(Number);
      reelsList[i].reorder(reelOrderArray);
    }
  } catch (err) {
    console.log(err);
  }
}

/* TODO:
  Add spin animations + sounds
  Show error texts to the player
*/
