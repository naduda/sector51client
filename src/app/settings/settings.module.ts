import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { GoogleComponent } from './components/google/google.component';
import { MainComponent } from './main.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { BackupComponent } from './components/backup/backup.component';

@NgModule({
  declarations: [MainComponent, GoogleComponent, BackupComponent],
  imports: [
    SharedModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
