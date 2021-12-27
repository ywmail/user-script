const $ = require("jquery");
import { UserScript } from "./user-script";

export class LazyDomUserScript extends UserScript {
  protected config = { attributes: false, childList: true, subtree: true };
  protected observer: MutationObserver = new MutationObserver(() => void 0);
  protected domString: string = "";

  constructor() {
    super();
  }

  /**
   * register
   */
  public register(domString?: string) {
    const list = $(domString || this.domString);
    const self = this;

    list.each(function (i, item) {
      self.observer.observe(item, self.config);
    });
  }

  public unregister() {
    this.observer.disconnect();
  }

  // eslint-disable-next-line no-magic-numbers
  public loopUntilTrue(fun: () => boolean, step = 500): Promise<any> {
    const MAX_LOOP = 20;
    return new Promise((resolve, reject) => {
      if (fun() === true) {
        resolve(true);
      }

      let count = 0;

      let timer: NodeJS.Timeout;
      checkReady();
      function checkReady(): void {
        clearTimeout(timer);
        if (fun() === true) {
          resolve(true);
          return;
        }
        if (++count > MAX_LOOP) {
          reject("已尝试超过最大次数，无脚本运行条件，退出");
          return;
        }
        timer = setTimeout(checkReady, step);
      }
    });
  }

  public waitUntilDomReady(domString?: string): Promise<any> {
    const fun = () => {
      return $(domString || this.domString).length > 0;
    };

    return this.loopUntilTrue(fun.bind(this));
  }
}
