import * as PIXI from "../pixi.mjs";

export default class TextHandler {
  static balanceText;
  static stakeText;

  static textStyle = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 36,
    fontWeight: "bold",
    fill: "lightGray",
    stroke: "black",
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: "black",
    dropShadowBlur: 4,
    dropShadowDistance: 2,
    align: "center",
  });

  static init(balance, stake, screenWidth, screenHeight) {
    TextHandler.balanceText = new PIXI.Text(
      "Balance:\n£" + balance,
      TextHandler.textStyle
    );
    TextHandler.balanceText.x = 80;
    TextHandler.balanceText.y = 20;

    TextHandler.stakeText = new PIXI.Text(
      "Stake:\n£" + stake,
      TextHandler.textStyle
    );
    TextHandler.stakeText.x = screenWidth / 2 - 9;
    TextHandler.stakeText.y = (3 * screenHeight) / 4 + 30;
  }

  static updateBalance(balance) {
    TextHandler.balanceText.text = "Balance:\n£" + balance;
  }

  static updateStake(stake) {
    TextHandler.stakeText.text = "Stake:\n£" + stake;
  }
}
