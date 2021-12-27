import { GreaseMonkey } from "./grease-monkey";
export class UserScript extends GreaseMonkey {
  constructor() {
    super();
    const uiSlot = document.getElementById("user-script-ui");
    if (!uiSlot) {
      const div = document.createElement("div");
      div.setAttribute("id", "user-script-ui");
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
