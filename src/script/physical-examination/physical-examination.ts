import { UiUserScript } from "@src/common/ui-user-script";
import { createApp } from "vue";
import UI from "./physical-examination-ui.vue";
import { HkuSzh } from "./hku-szh";

class PhysicalExamination extends UiUserScript {
  constructor() {
    super("PhysicalExamination");
    this.init();
  }

  public async init(): Promise<void> {
    const hkuSzh = new HkuSzh();
    const hkuSzhNeedUpdate = await hkuSzh.hasNewContent();

    const app = createApp(UI, {
      hasNewContent: hkuSzhNeedUpdate,
      contentObjectList: [hkuSzh],
    });
    app.mount("#PhysicalExamination");
  }
}

new PhysicalExamination();
