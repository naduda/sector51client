import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoogleComponent } from './components/google/google.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  { path: '', redirectTo: 'google' },
  {
    path: '', component: MainComponent, children: [
      {
        path: 'google', component: GoogleComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
