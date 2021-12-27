const $ = require("jquery");
import { LazyDomUserScript } from "@src/common/lazy-dom-user-script";

class HidePreAppointmentPublicity extends LazyDomUserScript {
  constructor() {
    super();
    this.observer = new MutationObserver(this.updateNode);
    this.domString = ".ant-layout-content";
    super.waitUntilDomReady().then(() => {
      this.updateNode();
      this.register();
    });
  }

  /**
   * updateNode
   */
  public updateNode() {
    const lis = $(".ant-spin-container ul:not(.ant-pagination) li");
    lis.each(function (i, item) {
      if (
        $(item).text().includes("xxx1") ||
        $(item).text().includes("xxx2") ||
        $(item).text().includes("xxx3")
      ) {
        item.style.display = "none";
      } else {
        item.style.display = "block";
      }
      if ($(item).text().includes("xxx1") || $(item).text().includes("xxx2")) {
        item.style.backgroundColor = "yellow";
      } else {
        item.style.backgroundColor = "initial";
      }
    });
  }
}

new HidePreAppointmentPublicity();
