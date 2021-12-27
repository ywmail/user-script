import { GreaseMonkey } from "@src/common/grease-monkey";
var axios = require("axios");
var adapter = require("axios-gmxhr-adapter");
axios.defaults.adapter = adapter;

export class VmallActivity extends GreaseMonkey {
  private activityStr = "";
  private intervalHour = 12;

  constructor(intervalHour = 12) {
    super();
    this.intervalHour = intervalHour;
  }

  public async needUpdate() {
    const newTime = new Date(await this.getNewTime());
    const now = new Date();
    // +3，表示过期3天还可以继续显示，因为公共日期和活动日期不一致。
    return newTime.getDate() + 3 >= now.getDate();
  }

  public async getUpdateContent() {
    const content = (await this.getVmallActivity())
      .replace(/<[^>]+>/gi, "")
      .substring(0, 100);
    const newTime = new Date(await this.getNewTime());
    const now = new Date();
    return `${content}<br/>还有${newTime.getDate() - now.getDate()}天开始`;
  }

  private async getVmallActivity(): Promise<string> {
    const timeGap =
      (new Date().getTime() -
        new Date(
          this.getStoreValue("vmall_lastUpdateTime", 1639958400000)
        ).getTime()) /
      1000 /
      60 /
      60;
    if (timeGap < this.intervalHour) {
      return this.getStoreValue("vmall_lastUpdateResult", "");
    }

    const params = new URLSearchParams();
    params.append("do", "load");
    params.append("fapp", "all");
    params.append("maskId", "912717");
    params.append("isPubUser", "1");

    try {
      const res = await axios.post(
        "https://xinsheng.xxx.com/cn/index.php?app=space&mod=Index&act=loadTopicFeed",
        params,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      this.setStoreValue("vmall_lastUpdateTime", new Date().getTime());
      this.setStoreValue("vmall_lastUpdateResult", res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  private async getNewTime() {
    if (!this.activityStr) {
      this.activityStr = await this.getVmallActivity();
    }
    const reg = /[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]/;
    return (this.activityStr.match(reg) || [])[0] || "2021-12-01";
  }
}
