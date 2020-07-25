import { Component, Input } from '@angular/core';

@Component({
  selector: 'sector-custom-spinner',
  templateUrl: './custom-spinner.component.html',
  styleUrls: ['./custom-spinner.component.sass']
})
export class CustomSpinnerComponent {

  @Input() strokeWidth = 3;
  @Input() diameter = 75;
  @Input() baseZindex = 1000;

}
