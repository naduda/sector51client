import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ClientsRoutingModule } from './clients-routing.module';
import { MainComponent } from './main.component';
import { ListComponent } from './components/list/list.component';

@NgModule({
  declarations: [MainComponent, ListComponent],
  imports: [
    SharedModule,
    ClientsRoutingModule
  ]
})
export class ClientsModule { }
