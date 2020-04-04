import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { AfterViewInit, ComponentRef, Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { SmartTooltipComponent } from './smart-tooltip.component';

@Directive({
  selector: '[smartTooltip]'
})
export class SmartTooltipDirective implements OnInit, AfterViewInit {

  @Input('smartTooltip') text = '';
  @Input() disableOnTextFit = true;

  private overlayRef: OverlayRef;
  private textFit: boolean;

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef,
  ) { }

  ngOnInit() {
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([{
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
        offsetY: 10
      }]);

    this.overlayRef = this.overlay.create({ positionStrategy });
  }

  ngAfterViewInit(): void {
    this.textFit = this.disableOnTextFit && this.elementRef.nativeElement.offsetWidth === this.elementRef.nativeElement.scrollWidth;
  }

  @HostListener('mouseenter')
  show() {
    if (this.textFit) {
      return;
    }
    const tooltipPortal = new ComponentPortal(SmartTooltipComponent);
    const tooltipRef: ComponentRef<SmartTooltipComponent> = this.overlayRef.attach(tooltipPortal);
    tooltipRef.instance.text = this.text;
  }

  @HostListener('mouseout')
  hide() {
    if (this.textFit) {
      return;
    }
    this.overlayRef.detach();
  }
}
