import { Component, ElementRef, forwardRef, HostListener, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { dateAdd, EDateValueType } from '@core/utils/date.utils';
import { AValueAccessor } from '../../helpers/abstract.value-accessor';
import { IPeriod } from './period.interface';

@Component({
  selector: 'sector-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.sass'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateRangePickerComponent),
    multi: true,
  }]
})
export class DateRangePickerComponent extends AValueAccessor {

  @Input() containerStyle: any;

  period: IPeriod;
  opened: boolean;

  constructor(private elRef: ElementRef) {
    super();

    this.period = {
      beg: new Date(),
      end: dateAdd(new Date(), EDateValueType.DAY, 7)
    };
  }

  @HostListener('document:click', ['$event'])
  @HostListener('document:touchstart', ['$event'])
  handleOutsideClick(event: any): void {
    if (!this.opened) {
      return;
    }

    const overlay = this.elRef.nativeElement.querySelector('.calendar-container');
    if (!this.elRef.nativeElement.contains(event.target) && !overlay.contains(event.target)) {
      const ignore = event.target.classList.contains('mat-calendar-body-cell-content');
      if (!ignore) {
        this.opened = false;
      }
    }
  }

  onUpdate(value?: IPeriod): void {
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: IPeriod): void {
    this.period = value || {
      beg: new Date(),
      end: new Date(Date.now() + 24 * 7 * 60 * 60000)
    };
  }

  openDialog() {
    this.opened = true;
  }

  onPeriodChange(v: IPeriod) {
    this.period = v;
    this.onUpdate(v);
  }
}
