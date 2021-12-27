import { UserScript } from "@src/common/user-script";
import { createApp } from "vue";
import UI from "./ui.vue";
import { HonorModle } from "./honor-modle";
import { VmallActivity } from "./vmall-activity";

class MonitorJob extends UserScript {
  constructor() {
    super();
    this.init();
  }

  public async init() {
    const honorModle = new HonorModle();
    const vmallActivity = new VmallActivity();
    const honorModleNeedUpdate = await honorModle.needUpdate();
    const vmallActivityNeedUpdate = await vmallActivity.needUpdate();
    let updateContent = "";
    updateContent += honorModleNeedUpdate
      ? await honorModle.getUpdateContent()
      : "";

    updateContent += "<br />";

    updateContent += vmallActivityNeedUpdate
      ? await vmallActivity.getUpdateContent()
      : "";

    const app = createApp(UI, {
      hasUpdate: honorModleNeedUpdate || vmallActivityNeedUpdate,
      updateContent: updateContent,
    });
    app.mount("#user-script-ui");
  }
}

new MonitorJob();
