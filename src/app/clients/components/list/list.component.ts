import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'sector-clients-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

  constructor(
    private clientService: ClientService,
  ) { }

  ngOnInit(): void {
    this.clientService.whoami.subscribe(e => console.log(e));
  }

}
