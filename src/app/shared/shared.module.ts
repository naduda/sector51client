import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { NgxMaskModule } from 'ngx-mask';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CustomSpinnerComponent } from './components/custom-spinner/custom-spinner.component';
import { SettingsDialogComponent } from './components/settings-dialog/settings-dialog.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { MyNativeDateAdapter } from './date.adapter';
import { MY_NATIVE_DATE_FORMATS } from './date.format';
import { SmartTooltipComponent } from './directives/smart-tooltip/smart-tooltip.component';
import { SmartTooltipDirective } from './directives/smart-tooltip/smart-tooltip.directive';

const materialModules = [
  CdkTableModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatTableModule,
  ScrollingModule,
  MatProgressSpinnerModule,
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
  SettingsDialogComponent,
  CustomSpinnerComponent,
];

const sharedDirectives = [
  SmartTooltipDirective,
];

@NgModule({
  declarations: [
    sharedComponents,
    sharedDirectives,
    SmartTooltipComponent,
  ],
  imports: [
    sharedModules,
  ],
  exports: [
    sharedModules,
    sharedComponents,
    sharedDirectives,
  ],
  providers: [
    { provide: DateAdapter, useClass: MyNativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_NATIVE_DATE_FORMATS }
  ]
})
export class SharedModule { }
