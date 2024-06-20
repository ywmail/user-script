import { GreaseMonkey } from "./grease-monkey";
export class UiUserScript extends GreaseMonkey {
  uiString: string;

  constructor(uiString = "ui-user-script") {
    super();
    this.uiString = uiString;
    const uiSlot = document.getElementById(this.uiString);
    if (!uiSlot) {
      const div = document.createElement("div");
      div.setAttribute("id", this.uiString);
      div.style.zIndex = "9999";
      div.style.position = "absolute";
      document.body.appendChild(div);
    }
  }

  /**
   * init
   */
  public init(): void {
    return;
  }
}
