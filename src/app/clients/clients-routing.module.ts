import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { ClientServicesComponent } from './components/user-services/user-services.component';
import { MainComponent } from './main.component';
import { ENavigationState } from './state/state.enum';

const routes: Routes = [
  { path: '', redirectTo: 'list' },
  {
    path: '', component: MainComponent, children: [
      { path: ENavigationState.LIST, component: ListComponent },
      { path: ENavigationState.SERVICES, component: ClientServicesComponent },
      { path: `${ENavigationState.SERVICES}/:id`, component: ClientServicesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
