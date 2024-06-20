import { UiUserScript } from "@src/common/ui-user-script";
import { createApp } from "vue";
import UI from "./monitor-ui.vue";
import { HonorModle } from "./honor-modle";

class MonitorJob extends UiUserScript {
  constructor() {
    super("MonitorJob");
    this.init();
  }

  public async init(): Promise<void> {
    const honorModle = new HonorModle(1);
    const honorModleNeedUpdate = await honorModle.hasNewContent();

    const app = createApp(UI, {
      hasNewContent: honorModleNeedUpdate,
      contentObjectList: [honorModle],
    });
    app.mount("#MonitorJob");
  }
}

new MonitorJob();
