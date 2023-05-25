import * as PIXI from "./pixi.mjs";
import Reel from "./containers/reel.js";
import Coords from "./helpers/coords.js";
import Textures from "./helpers/textures.js";
import Lever from "./containers/lever.js";
import TextHandler from "./helpers/textHandler.js";
import SlotMachine from "./containers/slotMachine.js";

const app = new PIXI.Application({
  backgroundColor: 0x1099bb,
  width: window.innerWidth,
  height: window.innerHeight,
});
export default app;

document.body.appendChild(app.view);

await Textures.loadTextures();

let balance = 100;
let stake = 5;
let isSpinning = false;

// Set up the slot machine sprite
const slotMachine = new SlotMachine(app.screen.width, app.screen.height);
app.stage.addChild(slotMachine);

slotMachine.buttons.up.on("pointerup", (event) => {
  stake += 5;
  TextHandler.updateStake(stake);
});

slotMachine.buttons.down.on("pointerup", (event) => {
  stake -= 5;
  TextHandler.updateStake(stake);
});

// Create the three reels
const reelsList = [
  new Reel(Coords.reelCoords.xLeft, slotMachine.sprite),
  new Reel(Coords.reelCoords.xMiddle, slotMachine.sprite),
  new Reel(Coords.reelCoords.xRight, slotMachine.sprite),
];

// Add text
TextHandler.init(balance, stake, app.screen.width, app.screen.height);
app.stage.addChild(TextHandler.balanceText);
app.stage.addChild(TextHandler.stakeText);

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
      // TODO: Show this on the screen
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

    balance = result.getAttribute("balance");
    const winnings = result.getAttribute("win");

    console.log();
    console.log("You bet: £" + stake);
    if (winnings > 0) {
      console.log("Congratulations! You won £" + winnings + "!");
    }
    console.log("Your new balance is: £" + balance);
    TextHandler.updateBalance(balance);

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
  Add selectable stake
    Add buttons such as +1 +5 +10 +50 and Reset
  --DONE-- Show current balance
  Show congratulations message on winning, with the winnings. Then fade it out (lower alpha over time)

  Add spin animations

  Make only the lever clickable, not the whole screen
  More error checking
*/
