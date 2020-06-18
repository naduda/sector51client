import { Component } from '@angular/core';
import { ADestroyHelper } from '@shared/helpers/abstract-destroy';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { IService } from '../../model/interfaces';
import { IUserService } from '../../model/user.service';
import { ClientService } from '../../services/client.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'sector-user-services',
  templateUrl: './user-services.component.html',
  styleUrls: ['./user-services.component.sass']
})
export class ClientServicesComponent extends ADestroyHelper {

  clientId: string;
  userServices: IUserService[];
  services: IService[];

  private reloadSubject = new BehaviorSubject<void>(null);

  constructor(
    private clientService: ClientService,
    navigationService: NavigationService,
  ) {
    super();

    this.reloadSubject
      .pipe(
        takeUntil(this.destroy$),
        switchMap(_ => navigationService.state$),
        map(e => e.clientId),
        filter(e => !!e),
      )
      .subscribe(e => this.loadUserServices(e));
  }

  reload() {
    this.reloadSubject.next();
  }

  private loadUserServices(clientId: string) {
    this.clientId = clientId;

    combineLatest([this.clientService.services$, this.clientService.getUserServices(this.clientId)])
      .pipe(
        take(1)
      )
      .subscribe(([services, userServices]) => {
        this.services = services;
        this.userServices = [];
        for (const s of userServices) {
          this.userServices.push({
            ...s,
            name: services.find(z => z.id === s.idService).name,
          });
        }
      });
  }
}
