import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { GoogleComponent } from './components/google/google.component';

@NgModule({
  declarations: [MainComponent, GoogleComponent],
  imports: [
    SharedModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
