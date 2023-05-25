import * as PIXI from "../pixi.mjs";

export default class TextHandler {
  static textStyle = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 32,
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

  static balanceText;

  static updateBalance(balance) {
    TextHandler.balanceText.text = "Balance:\n£" + balance;
  }

  static init(balance) {
    TextHandler.balanceText = new PIXI.Text(
      "Balance:\n£" + balance,
      TextHandler.textStyle
    );
    TextHandler.balanceText.x = 80;
    TextHandler.balanceText.y = 20;
  }
}
