class IMeeting {
  constructor() {
    this.init();
  }

  public init(): void {
    const el = document.getElementById("hidMessage");
    const value = el && el.getAttribute("value");
    if (value) {
      const openClient = document.createElement("img");

      // get value which id is Servertime;
      const Servertime = document.getElementById("Servertime")?.getAttribute("value") || "";

      if (document.visibilityState === "visible") {
        if (sessionStorage.getItem("Servertime") !== Servertime) {
          // get value of hidStartUrl
          const value = document.getElementById("hidStartUrl")?.getAttribute("value") || "";
          openClient.setAttribute("src", value);
          sessionStorage.setItem("Servertime", Servertime);
        }
      }
    }
  }
}

new IMeeting();
