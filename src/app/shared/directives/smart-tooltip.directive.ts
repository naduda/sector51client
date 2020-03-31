import { AfterViewInit, Directive, ElementRef, NgZone, OnDestroy } from '@angular/core';

@Directive({
  selector: '[sectorSmartTooltip]'
})
export class SmartTooltipDirective implements AfterViewInit, OnDestroy {

  textFit = false;
  tooltip;

  constructor(
    private el: ElementRef,
    private ngZone: NgZone
  ) { }

  ngAfterViewInit(): void {
    this.textFit = this.el.nativeElement.offsetWidth === this.el.nativeElement.scrollWidth;

    // this.tooltip = new MatTooltip(this.el, this.ngZone);
    // this.tooltip.tooltipPosition = 'top';
    // this.tooltip.disabled = this.textFit;
    // this.tooltip.text = this.el.nativeElement.innerText;
    // this.tooltip.ngAfterViewInit();
  }

  ngOnDestroy(): void {
    // this.tooltip.ngOnDestroy();
  }
}
