import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { IGoogleCredentials } from '../model/interfaces';
import { BackupService } from '../services/backup.service';

@Component({
  selector: 'back-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {
  form: FormGroup;
  credentials: IGoogleCredentials;

  constructor(
    private backupService: BackupService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.backupService.hasGoogleCredentials
      .pipe(
        catchError(err => {
          throw err;
        })
      )
      .subscribe(e => {
        // e.ok = false;
        this.credentials = e;
      });
  }

  runBackup() {
    this.backupService.runBackup(this.credentials.page)
      .subscribe();
  }

  runRestore() {
    console.log(222)
  }
}
