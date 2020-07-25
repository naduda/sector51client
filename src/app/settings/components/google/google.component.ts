import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IGoogleCredentials } from '../../model/google.interface';
import { GoogleService } from '../../services/google.service';

@Component({
  selector: 'sector-settings-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.sass']
})
export class GoogleComponent implements OnInit {

  credentials: IGoogleCredentials;
  googleAuthForm: FormGroup;

  constructor(
    private googleService: GoogleService,
    fb: FormBuilder,
  ) {
    this.googleAuthForm = fb.group({
      code: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.initCredentials();
  }

  private initCredentials() {
    this.googleService.hasGoogleCredentials.subscribe(e => this.credentials = e);
  }

  uploadCredentials(files: FileList) {
    // this.googleService.uploadFile(files[0], 'uploadFile', 'credentials.json')
    //   .subscribe(_ => this.initCredentials());
  }

  googleAuth() {
    if (this.googleAuthForm.invalid) {
      return;
    }
    const code = this.googleAuthForm.value.code;
    this.googleAuthForm.get('code').reset();
    this.googleService.createTokenFile(code).subscribe();
  }
}
