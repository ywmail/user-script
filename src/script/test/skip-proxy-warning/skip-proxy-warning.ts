(function (): void {
  "use strict";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const node: any = document
    .evaluate('//*[@id="continueBtn"]', document)
    .iterateNext();
  node.click();
})();
