import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../common/auth/auth-guard.guard';
import { MainComponent } from './main.component';
import { SettingsComponent } from './pages/settings.component';

const routes: Routes = [
  { path: '', redirectTo: 'settings', pathMatch: 'full' },
  {
    path: '', component: MainComponent, canActivate: [AuthGuard], children: [
      {
        path: 'settings', component: SettingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackupRoutingModule { }
