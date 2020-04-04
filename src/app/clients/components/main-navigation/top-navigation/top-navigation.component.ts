import { Component } from '@angular/core';
import { ESettings } from 'src/app/clients/model/settings.enum';
import { SettingsService } from 'src/app/clients/services/settings.service';

@Component({
  selector: 'sector-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.sass']
})
export class TopNavigationComponent {

  constructor(
    private settingsService: SettingsService,
  ) { }

  openServices(e) {
    e.preventDefault();
    this.settingsService.open(ESettings.SERVICES).subscribe();
  }
}
