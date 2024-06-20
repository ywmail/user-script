class Onebox {
  constructor() {
    this.init();
  }

  public init(): void {
    // create an style element and set class .web-office-iframe position to fixed and insert to head
    const style = document.createElement("style");
    style.textContent = `
      .web-office-iframe {
        position: fixed !important; 
      }
      #root > .editHeader > div:nth-child(2) {
        z-index: 9999 !important;
        margin-right: 300px !important;
      }
      `;
    document.head.appendChild(style);
  }
}

new Onebox();
