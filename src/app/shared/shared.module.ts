import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { NgxMaskModule } from 'ngx-mask';
import { UploadFileComponent } from './components/upload-file/upload-file.component';

const materialModules = [
  MatMenuModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
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
  UploadFileComponent
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
