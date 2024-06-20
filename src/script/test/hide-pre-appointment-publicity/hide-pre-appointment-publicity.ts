/* global MutationObserver */
import $ from "jquery";
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
  public updateNode(): void {
    const lis = $(".ant-spin-container ul:not(.ant-pagination) li");
    lis.each(function (i, item) {
      // 先初始化，因为数据刷新时，dom不会重置
      item.style.backgroundColor = "initial";
      item.style.display = "block";

      const text = $(item).text();
      if (text.includes("流程IT") || text.includes("质量运营") || text.includes("数字化及IT装备") || text.includes("BT&IT")) {
        item.style.backgroundColor = "yellow";
        return; // 如果是重点部门，直接突出显示，不隐藏
      }

      if (text.includes("任前公示") || text.includes("任命") || text.includes("任免")) {
        item.style.display = "none";
      }
    });
  }
}

new HidePreAppointmentPublicity();
