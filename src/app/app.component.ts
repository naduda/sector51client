import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sector-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loaded: boolean;

  constructor() { }

  ngOnInit(): void {
    this.loaded = true;
  }
}
