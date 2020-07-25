import { Component } from '@angular/core';
import { ClientService } from '@clients/services/client.service';
import { ConfirmService } from '@shared/services/confirm.service';
import { forkJoin } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

interface IClient {
  time: Date;
  surname: string;
  name: string;
  box: number;
  idType: number;
  id: string;
}

@Component({
  selector: 'sector-clients-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent {

  clients: IClient[];
  displayedColumns: string[] = ['idx', 'time', 'surname', 'name', 'box', 'delete'];

  constructor(
    private clientService: ClientService,
    private confirmService: ConfirmService,
  ) {
    this.init(false);
  }

  private init(roload: boolean): void {
    forkJoin([this.clientService.cliensList$, this.clientService.boxList$(roload)])
      .pipe(
        map(([clients, boxes]) => {
          boxes = boxes.filter(e => e.card && e.idType !== 3);
          const res: IClient[] = [];

          for (const box of boxes) {
            const client = clients.find(e => e.card === box.card);
            if (client) {
              res.push({
                time: box.time,
                surname: client.surname,
                name: client.name,
                box: box.number,
                idType: box.idType,
                id: client.id,
              });
            }
          }

          return res.sort((a, b) => a.time.getTime() - b.time.getTime());
        })
      )
      .subscribe(e => this.clients = e);
  }

  deleteClient(c: IClient) {
    this.confirmService.confirm({
      title: 'Are you sure?',
      message: '',
    })
      .pipe(
        filter(Boolean),
        switchMap(_ => this.clientService.updateBox({
          card: '',
          idType: c.idType,
          number: c.box,
          time: null,
        }))
      )
      .subscribe(_ => this.init(true));
  }
}
