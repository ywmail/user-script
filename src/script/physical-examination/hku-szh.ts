import { MonitorUserScript } from "@src/common/monitor-user-script";
import axios from "axios";
const adapter = require("axios-userscript-adapter");
axios.defaults.adapter = adapter?.default;

export class HkuSzh extends MonitorUserScript {
  protected className = "HkuSzh";

  constructor(intervalHour = 1) {
    super(intervalHour);
    super.triggerContentUpdate(this.getUpdateContent.bind(this));
  }

  private async getUpdateContent(): Promise<string> {
    try {
      const res1 = await axios.get("https://apps.daishutijian.com/api/org/schedule?org_id=2175&package_id=222726&company_id=90"); // 颈椎
      const res2 = await axios.get("https://apps.daishutijian.com/api/org/schedule?org_id=2175&package_id=222728&company_id=90"); // 腰椎
      const cervicalVertebra = Object.values(res1.data).map((s) => (s as string).replace(/(?<=\|)[1-9]\d*(?=\|)/, ">0"));
      const lumbarVertebra = Object.values(res2.data).map((s) => (s as string).replace(/(?<=\|)[1-9]\d*(?=\|)/, ">0"));

      return `cervicalVertebra<br>
      ${cervicalVertebra.join("\r\n <br>")}
      <br>
      lumbarVertebra<br>
      ${lumbarVertebra.join("\r\n <br>")}
      `;
    } catch (error) {
      console.log(error);
      return "";
    }
  }
}
