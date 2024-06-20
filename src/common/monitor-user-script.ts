import { getDateFromString, millisecondToHour } from "@src/util/util";
import { UiUserScript } from "./ui-user-script";
export class MonitorUserScript extends UiUserScript {
  private intervalHour = 12;
  private contentSize = 2000;
  protected className = MonitorUserScript.name;

  constructor(intervalHour = 12, contentSize = 2000) {
    super();
    this.intervalHour = intervalHour;
    this.contentSize = contentSize;
  }

  public async hasNewContent(): Promise<boolean> {
    return (await this.getStoreValue(`new_event_${this.className}`)) === true;
  }

  public async getContent(): Promise<string> {
    const lastValue = await this.getStoreValue(`last_value_${this.className}`, "");
    const eventDate = getDateFromString(lastValue);

    if (eventDate) {
      return `${lastValue.substring(0, this.contentSize)}<br>
                时间：${eventDate}`;
    } else {
      return lastValue.substring(0, this.contentSize) + "<br>";
    }
  }

  /**
   * muteNewEvent
   */
  public async muteNewEvent() {
    this.setStoreValue(`new_event_${this.className}`, false);
  }

  public async triggerContentUpdate(update: () => Promise<string>) {
    const timeGap = millisecondToHour(
      new Date().getTime() - new Date(await this.getStoreValue(`last_check_time_${this.className}`, 1639958400000)).getTime()
    );
    if (timeGap < this.intervalHour) {
      return;
    }

    const content = await update();

    this.setStoreValue(`last_check_time_${this.className}`, new Date().getTime());
    if ((await this.getStoreValue(`last_value_${this.className}`)) !== content) {
      this.setStoreValue(`last_value_${this.className}`, content);

      // 只在更新的内容中含有有效的时间，才显示UI标识
      if (getDateFromString(content)) {
        this.setStoreValue(`new_event_${this.className}`, true);
      }
    }
  }
}
