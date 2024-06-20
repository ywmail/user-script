export function millisecondToHour(milliseconds: number) {
  return milliseconds / 1000 / 60 / 60;
}

export function millisecondToDay(milliseconds: number) {
  return millisecondToHour(milliseconds) / 24;
}

export function getDateFromString(str: string): string | undefined {
  const reg = /[1-2]\d\d\d[-\.][0-1]?\d[-\.][0-3]?\d/;
  return ((str && str.match(reg)) || [])[0];
}
