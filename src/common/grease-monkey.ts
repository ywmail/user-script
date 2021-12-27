export class GreaseMonkey {
  public setStoreValue(name: string, value) {
    GM_setValue(name, value);
  }

  public getStoreValue(name: string, defaultValue?): any {
    return GM_getValue(name, defaultValue);
  }
}
