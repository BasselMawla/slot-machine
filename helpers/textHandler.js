import * as PIXI from "../pixi.min.mjs";

export default class TextHandler {
  static balanceText;
  static stakeText;
  static winningsText;

  static textStyle = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 22,
    fontWeight: "bold",
    fill: "lightGray",
    stroke: "black",
    strokeThickness: 3,
    dropShadow: true,
    dropShadowColor: "black",
    dropShadowBlur: 4,
    dropShadowDistance: 2,
    align: "center",
  });

  static init(balance, stake) {
    TextHandler.balanceText = new PIXI.Text(
      "Balance:\n£" + balance + ".00",
      TextHandler.textStyle
    );
    TextHandler.balanceText.x = -197;
    TextHandler.balanceText.y = 170;

    TextHandler.stakeText = new PIXI.Text(
      "Stake:\n£" + stake,
      TextHandler.textStyle
    );
    TextHandler.stakeText.x = -12;
    TextHandler.stakeText.y = 170;

    TextHandler.winningsText = new PIXI.Text(
      "Won:\n£" + 0,
      TextHandler.textStyle
    );
    TextHandler.winningsText.x = 146;
    TextHandler.winningsText.y = 170;
  }

  static updateBalance(balance) {
    TextHandler.balanceText.text = "Balance:\n£" + balance;
  }

  static updateStake(stake) {
    TextHandler.stakeText.text = "Stake:\n£" + stake;
  }

  static updateWinnings(totalWinnings) {
    TextHandler.winningsText.text = "Won:\n£" + totalWinnings;
  }
}
