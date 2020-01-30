import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SectorCommonModule } from '../common/common.module';
import { BackupRoutingModule } from './backup-routing.module';
import { MainComponent } from './main.component';
import { SettingsComponent } from './pages/settings.component';
import { GoogleCredentialsComponent } from './components/google-credentials/google-credentials.component';

@NgModule({
  declarations: [MainComponent, SettingsComponent, GoogleCredentialsComponent],
  imports: [
    CommonModule,
    BackupRoutingModule,
    SectorCommonModule.forRoot()
  ]
})
export class BackupModule { }
