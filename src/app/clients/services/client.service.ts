import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { IUser } from '../model/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private clients$: Observable<IUser[]>;

  constructor(private http: HttpClient) { }

  get whoami(): Observable<IUser> {
    return this.http.get<IUser>('/private/whoami');
  }

  get cliensList(): Observable<IUser[]> {
    if (!this.clients$) {
      this.clients$ = this.http.get<IUser[]>('/private/clients-list')
        .pipe(
          shareReplay(1)
        );
    }
    return this.clients$;
  }

  getFilteredClients(v: string): Observable<IUser[]> {
    if (!v) {
      return this.cliensList;
    }
    return this.cliensList
      .pipe(
        map(e => e.filter(a => this.filterClients(a, v)))
      );
  }

  private filterClients(u: IUser, v: string): boolean {
    if (!v) {
      return true;
    }

    if (u.surname.toLowerCase().includes(v)) {
      return true;
    }

    if (u.name.toLowerCase().includes(v)) {
      return true;
    }

    return u.phone.toLowerCase().includes(v);
  }
}
