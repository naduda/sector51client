import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs/internal/observable/of';
import { catchError, switchMap } from 'rxjs/operators';
import { IGoogleCredentials } from '../../model/interfaces';
import { BackupService } from '../../services/backup.service';

@Component({
  selector: 'settings-google-credentials',
  templateUrl: './google-credentials.component.html',
  styleUrls: ['./google-credentials.component.sass']
})
export class GoogleCredentialsComponent implements OnChanges {
  // https://docs.google.com/spreadsheets/d/1RnciITJVmNYS3U22aL8AZgBrNYmbLDdHnc2XjT-nhls/edit#gid=0
  @Input() credentials: IGoogleCredentials;

  form: FormGroup;
  formExp: FormGroup;
  hasToken: boolean;

  private file: File;

  constructor(
    fb: FormBuilder,
    private backupService: BackupService
  ) {
    this.form = fb.group({
      file: [null, Validators.required],
      code: [null],
      page: [null, Validators.required]
    });

    this.formExp = fb.group({
      code: [null, Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.credentials) {
      const credentials: IGoogleCredentials = changes.credentials.currentValue;
      if (credentials) {
        this.hasToken = !this.credentials.authURL;
        this.form.get('page').patchValue(credentials.page);
        if (credentials.hasFile) {
          this.form.get('file').clearValidators();
        } else {
          this.form.get('file').setValidators(Validators.required);
        }
        this.form.get('file').updateValueAndValidity();
      }
    }
  }

  uploadFile({ target }) {
    this.file = target.files[0];
  }

  saveCredentials() {
    if (this.form.invalid) {
      return;
    }

    const pageId = this.form.get('page').value;
    this.backupService.savePageId(pageId)
      .pipe(
        switchMap(_ => this.file ? this.backupService.uploadFile(this.file, 'credentials.json') : of()),
        catchError(err => {
          console.log(err)
          return of(null);
        })
      )
      .subscribe(_ => this.form.get('file').setValue([]));
  }

  saveToken() {
    const code = this.formExp.get('code').value;
    console.log(code)
    this.backupService.createTokenFile(code).subscribe(_ => this.credentials.exp = false);
  }
}
