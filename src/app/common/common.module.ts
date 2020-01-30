import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DropdownModule } from 'primeng/dropdown';
import { ErrorInterceptor } from './auth/error.interceptor';
import { JwtInterceptor } from './auth/jwt-interceptor';
import { LanguagesComponent } from './components/languages/languages.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const SHARED_MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  DropdownModule
];

const SHARED_COMPONENTS = [
  LanguagesComponent,
  UploadFileComponent
];

@NgModule({
  declarations: [
    SHARED_COMPONENTS
  ],
  imports: [
    SHARED_MODULES,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    SHARED_MODULES,
    TranslateModule,
    SHARED_COMPONENTS
  ]
})
export class SectorCommonModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SectorCommonModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        CanDeactivateGuard

        // {
        //   provide: HTTP_INTERCEPTORS,
        //   useClass: AuthFakeBackendInterceptor,
        //   multi: true
        // }
      ]
    };
  }

}
