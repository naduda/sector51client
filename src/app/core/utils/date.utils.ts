export const DAY_IN_MILLS = 86400000;

export enum EDateValueType {
  DAY, MONTH, YEAR
}

export function dateAdd(d: Date, t: EDateValueType, v: number): Date {
  switch (t) {
    case EDateValueType.DAY:
      return new Date(d.getTime() + v * DAY_IN_MILLS);
    case EDateValueType.MONTH:
      const yv = v > 12 ? Math.floor(v / 12) : 0;
      v = v > 12 ? v % 12 : v;
      let month = d.getMonth() + v;
      let year = d.getFullYear() + yv;
      if (month > 11) {
        year++;
        month -= 12;
      }
      if (month < 0) {
        year--;
        month += 12;
      }
      return new Date(year, month, d.getDate());
    case EDateValueType.YEAR:
      return new Date(d.getFullYear() + v, d.getMonth(), d.getDate());
  }
}
