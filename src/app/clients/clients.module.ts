import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../shared/shared.module';
import { ClientsRoutingModule } from './clients-routing.module';
import { ListComponent } from './components/list/list.component';
import { MainNavigationComponent } from './components/main-navigation/main-navigation.component';
import { TopNavigationComponent } from './components/main-navigation/top-navigation/top-navigation.component';
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
    TopNavigationComponent,
    TreeNavigationComponent,
    MainNavigationComponent,
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
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ]
})
export class ClientsModule { }
