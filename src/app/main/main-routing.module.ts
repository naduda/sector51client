import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../common/auth/auth-guard.guard';
import { MainUserListComponent } from './main-user-list.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'list' },
  {
    path: '', component: MainUserListComponent, canActivate: [AuthGuard], children: [
      {
        path: 'list', component: UserListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
