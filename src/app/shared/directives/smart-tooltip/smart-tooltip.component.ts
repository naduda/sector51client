import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sector-smart-tooltip',
  templateUrl: './smart-tooltip.component.html',
  styleUrls: ['./smart-tooltip.component.sass']
})
export class SmartTooltipComponent implements OnInit {

  @Input() text: string;

  constructor() { }

  ngOnInit(): void {
  }

}
