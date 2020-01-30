import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGoogleCredentials } from '../model/interfaces';

@Injectable({
  providedIn: 'root'
})
export class BackupService {

  constructor(private http: HttpClient) { }

  savePageId(pageId: string): Observable<void> {
    return this.http.post<void>('private/google-page-id', { pageId });
  }

  get hasGoogleCredentials(): Observable<IGoogleCredentials> {
    return this.http.get<IGoogleCredentials>('/private/has-google-credentials');
  }

  uploadFile(file, fileName?: string): Observable<void> {
    const formData: FormData = new FormData();
    formData.append('uploadFile', file, fileName || file.name);
    return this.http.post<void>('/private/upload', formData);
  }

  createTokenFile(code: string) {
    return this.http.post('/private/create-google-token', { code })
  }

  runBackup(sheetId: string): Observable<void> {
    return this.http.post<void>('/private/backup', { sheetId });
  }
}
