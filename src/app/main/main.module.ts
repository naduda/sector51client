import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { SectorCommonModule } from '../common/common.module';
import { TopNavigationComponent } from './components/top-navigation/top-navigation.component';
import { MainRoutingModule } from './main-routing.module';
import { MainUserListComponent } from './main-user-list.component';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [UserListComponent, MainUserListComponent, TopNavigationComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    SectorCommonModule.forRoot(),
    MenubarModule
  ]
})
export class MainModule { }
