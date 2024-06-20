import { MonitorUserScript } from "@src/common/monitor-user-script";
import axios from "axios";
const adapter = require("axios-userscript-adapter");
axios.defaults.adapter = adapter?.default;

export class HonorModle extends MonitorUserScript {
  protected className = "HonorModle";

  constructor(intervalHour = 12, contentSize = 200) {
    super(intervalHour, contentSize);
    super.triggerContentUpdate(this.getUpdateContent.bind(this));
  }

  private async getUpdateContent(): Promise<string> {
    try {
      const res = await axios.get("http://w3.xxx.com/honormodle/services/purchase/purchaseCommon/getPopupNoticeInfo");
      const div = document.createElement("div");
      div.innerHTML = res.data.noticeContent;
      return div?.textContent || "";
    } catch (error) {
      console.log(error);
      return "";
    }
  }
}
