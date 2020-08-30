import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'sector-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.sass']
})
export class BackupComponent {

  constructor(private http: HttpClient) { }

  onUpload(files: FileList) {
    console.log(111, files)
    this.http.post<void>('/private/restore-file', { name: files[0].name }).subscribe();
  }

}
