import { Component, Input } from '@angular/core';

@Component({
  selector: 'sector-smart-tooltip',
  templateUrl: './smart-tooltip.component.html',
  styleUrls: ['./smart-tooltip.component.sass']
})
export class SmartTooltipComponent {

  @Input() text: string;

}
