import { GreaseMonkey } from "@src/common/grease-monkey";
var axios = require("axios");
var adapter = require("axios-gmxhr-adapter");
axios.defaults.adapter = adapter;

export class HonorModle extends GreaseMonkey {
  private intervalHour = 12;

  constructor(intervalHour = 12) {
    super();
    this.intervalHour = intervalHour;
  }

  public async needUpdate() {
    const activities = await this.getActivity();
    return activities.length > 0;
  }

  public getUpdateContent() {
    return this.getActivityContent();
  }

  private async getActivity() {
    const timeGap =
      (new Date().getTime() -
        new Date(
          this.getStoreValue("honorModle_lastUpdateTime", 1639958400000)
        ).getTime()) /
      1000 /
      60 /
      60;
    if (timeGap < this.intervalHour) {
      return this.getStoreValue("honorModle_lastUpdateResult", []);
    }

    try {
      const res = await axios.get(
        "http://w3.xxx.com/honormodle/services/purchase/activity/findActivityListByClient"
      );
      this.setStoreValue("honorModle_lastUpdateTime", new Date().getTime());
      this.setStoreValue(
        "honorModle_lastUpdateResult",
        res.data.result.activitys
      );
      return res.data.result.activitys;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  private async getActivityContent(): Promise<string> {
    try {
      const res = await axios.get(
        "http://w3.xxx.com/honormodle/services/purchase/purchaseCommon/getPopupNoticeInfo"
      );
      return (
        res.data.noticeContent.replace(/<[^>]+>/gi, "").substring(0, 100) +
        "<br />"
      );
    } catch (error) {
      console.log(error);
      return "";
    }
  }
}
