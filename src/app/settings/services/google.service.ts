import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGoogleCredentials } from '../model/google.interface';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(private http: HttpClient) { }

  get hasGoogleCredentials(): Observable<IGoogleCredentials> {
    return this.http.get<IGoogleCredentials>('/private/has-google-credentials');
  }

  uploadFile(file, name?: string, fileName?: string): Observable<void> {
    const formData: FormData = new FormData();
    formData.append(name || 'file', file, fileName || file.name);
    return this.http.post<void>('/private/upload', formData);
  }

  createTokenFile(code: string): Observable<void> {
    return this.http.post<void>('/private/create-google-token', { code });
  }
}
