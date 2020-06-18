import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { IBox, IService, IUser } from '../model/interfaces';
import { IUserService, IUserServiceFormValue } from '../model/user.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private serviceList$: Observable<IService[]>;
  private clients$: Observable<IUser[]>;
  private boxes$: Observable<IBox[]>;

  constructor(private http: HttpClient) { }

  get whoami$(): Observable<IUser> {
    return this.http.get<IUser>('/private/whoami');
  }

  get services$(): Observable<IService[]> {
    if (!this.serviceList$) {
      this.serviceList$ = this.http.get<IService[]>('/private/services')
        .pipe(shareReplay(1));
    }
    return this.serviceList$;
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

  updateUser(u: IUser): Observable<void> {
    return this.http.put<void>('/private/user', u);
  }

  getUserServices(id: string): Observable<IUserService[]> {
    const params = new HttpParams().set('id', id);
    return this.http.get<IUserService[]>('/private/user-services', { params });
  }

  createUserService(v: IUserServiceFormValue): Observable<void> {
    v.value = v.idService === 2 ? v.value + '' : null;
    return this.http.post<void>('/private/user-services', v)
      .pipe(
        tap(_ => {
          this.boxes$ = null;
          this.clients$ = null;
        }),
      );
  }

  updateUserService(v: IUserService): Observable<void> {
    v.value = v.idService === 2 ? v.value + '' : null;
    return this.http.put<void>('/private/user-services', v)
      .pipe(
        tap(_ => {
          this.boxes$ = null;
          this.clients$ = null;
        })
      );
  }

  deleteUserService(v: IUserService): Observable<void> {
    v.value = v.idService === 2 ? v.value + '' : null;
    return this.http.post<void>('/private/user-services/delete', v)
      .pipe(
        tap(_ => {
          this.boxes$ = null;
          this.clients$ = null;
        })
      );
  }

  boxList$(reload = false): Observable<IBox[]> {
    if (!this.boxes$ || reload) {
      this.boxes$ = this.http.get<IBox[]>('/private/boxes')
        .pipe(shareReplay(1));
    }
    return this.boxes$;
  }

}
