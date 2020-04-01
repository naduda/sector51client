import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { IUser } from '../model/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private clients$: Observable<IUser[]>;

  constructor(private http: HttpClient) { }

  get whoami$(): Observable<IUser> {
    return this.http.get<IUser>('/private/whoami');
  }

  get cliensList$(): Observable<IUser[]> {
    if (!this.clients$) {
      this.clients$ = this.http.get<IUser[]>('/private/clients-list')
        .pipe(
          shareReplay(1)
        );
    }
    return this.clients$;
  }

  getFilteredClients(v: string): Observable<IUser[]> {
    if (v) {
      const params = new HttpParams().set('f', v);
      return this.http.get<IUser[]>('/private/clients-list', { params });
    }
    return this.cliensList$;
  }
}
