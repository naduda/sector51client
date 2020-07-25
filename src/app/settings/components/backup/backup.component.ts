import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sector-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.sass']
})
export class BackupComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onUpload(files: FileList) {
    this.http.post<void>('/private/restore-file', { name: files[0].name }).subscribe();
  }
}
