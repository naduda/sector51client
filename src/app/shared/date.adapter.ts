import { NativeDateAdapter } from '@angular/material/core';

export class MyNativeDateAdapter extends NativeDateAdapter {

  format(date: Date, displayFormat: any): string {
    if (displayFormat === 'input') {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const dayStr = day < 10 ? '0' + day : day;
      const monthStr = month < 10 ? '0' + month : month;

      return `${dayStr}.${monthStr}.${year}`;
    }

    return date.toDateString();
  }
}
