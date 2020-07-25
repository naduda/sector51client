import { Component } from '@angular/core';
import { NavigationService } from '@clients/services/navigation.service';
import { ENavigationState } from '@clients/state/state.enum';

@Component({
  selector: 'sector-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.sass']
})
export class TopNavigationComponent {

  constructor(
    private navigationService: NavigationService,
  ) { }

  openUserServices(e) {
    e.preventDefault();
    this.navigationService.routeState = ENavigationState.SERVICES;
  }

  openClients(e) {
    e.preventDefault();
    this.navigationService.routeState = ENavigationState.LIST;
  }
}
