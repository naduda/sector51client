import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPeriod } from '../period.interface';

@Component({
  selector: 'sector-date-range-dialog',
  templateUrl: './date-range-dialog.component.html',
  styleUrls: ['./date-range-dialog.component.sass']
})
export class DateRangeDialogComponent implements OnInit {

  @Input() period: IPeriod;

  @Output() periodChange = new EventEmitter<IPeriod>();

  begStart: Date;
  endStart: Date;

  constructor() { }

  ngOnInit(): void {
    this.period = this.period || {
      beg: new Date(),
      end: new Date(),
    };
    this.begStart = this.period.beg;
    this.endStart = this.period.end;
  }

  onSelectedChange(v: Date, isBeg?: boolean) {
    if (isBeg) {
      this.period.beg = v;
    } else {
      this.period.end = v;
    }
    this.periodChange.emit(this.period);
  }

}
