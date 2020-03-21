import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMaskModule } from 'ngx-mask';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';

const materialModules = [
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatTooltipModule,
  ScrollingModule,
];

const sharedModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  NgxMaskModule.forRoot(),
  materialModules,
];

const sharedComponents = [
  UploadFileComponent,
  ConfirmDialogComponent,
];

@NgModule({
  declarations: [
    sharedComponents,
  ],
  imports: [
    sharedModules,
  ],
  exports: [
    sharedModules,
    sharedComponents,
  ]
})
export class SharedModule { }
