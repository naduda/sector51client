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
import { ServicesSettingsComponent } from './components/settings/services-settings/services-settings.component';
import { UserSettingsComponent } from './components/settings/user-settings/user-settings.component';
import { TreeNavigationComponent } from './components/tree-navigation/tree-navigation.component';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
    TopNavigationComponent,
    TreeNavigationComponent,
    MainNavigationComponent,
    ServicesSettingsComponent,
    UserSettingsComponent,
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
