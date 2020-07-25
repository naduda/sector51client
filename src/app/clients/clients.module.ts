import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ClientsRoutingModule } from './clients-routing.module';
import { ListComponent } from './components/list/list.component';
import { UserSettingsComponent } from './components/settings/user-settings/user-settings.component';
import { TreeNavigationComponent } from './components/tree-navigation/tree-navigation.component';
import { CreateServiceFormComponent } from './components/user-services/create-service-form/create-service-form.component';
import { CreateServiceWizardComponent } from './components/user-services/create-service-wizard/create-service-wizard.component';
import { UserServiceListComponent } from './components/user-services/list/list.component';
import { ServicesSettingsPageComponent } from './components/user-services/services-settings/services-settings.component';
import { ClientServicesComponent } from './components/user-services/user-services.component';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
    TreeNavigationComponent,
    UserSettingsComponent,
    ClientServicesComponent,
    CreateServiceWizardComponent,
    CreateServiceFormComponent,
    UserServiceListComponent,
    ServicesSettingsPageComponent,
  ],
  imports: [
    SharedModule,
    ClientsRoutingModule,
  ]
})
export class ClientsModule { }
