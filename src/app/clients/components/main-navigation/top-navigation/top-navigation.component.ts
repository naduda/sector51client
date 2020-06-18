import { Component } from '@angular/core';
import { ESettings } from '@clients/model/settings.enum';
import { NavigationService } from '@clients/services/navigation.service';
import { SettingsService } from '@clients/services/settings.service';
import { ENavigationState } from '@clients/state/state.enum';

@Component({
  selector: 'sector-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.sass']
})
export class TopNavigationComponent {

  constructor(
    private settingsService: SettingsService,
    private navigationService: NavigationService,
  ) { }

  openServices(e) {
    e.preventDefault();
    this.settingsService.open(ESettings.SERVICES).subscribe();
  }

  openUserServices(e) {
    e.preventDefault();
    this.navigationService.routeState = ENavigationState.SERVICES;
  }

  openClients(e) {
    e.preventDefault();
    this.navigationService.routeState = ENavigationState.LIST;
  }
}
