/* eslint-disable @typescript-eslint/no-explicit-any */

export class GreaseMonkey {
  public setStoreValue(name: string, value: any): void {
    GM.setValue(name, value);
  }

  public async getStoreValue(name: string, defaultValue?: any): Promise<any> {
    return await GM.getValue(name, defaultValue);
  }

  // 获取两个日期之间相差的天数
  public getDaysBetweenTwoDates(begin, end) {}
}
