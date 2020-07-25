import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map, tap } from 'rxjs/operators';

export interface IAuthUser {
  id: any;
  name: string;
  password: string;
  token?: string;
}

const AUTH_CONST = {
  STORAGE_NAME: 'SECTOR_STORAGE',
};

const AUTH_FIELD = {
  CURRENT_USER: 'currentUser',
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser$: Observable<IAuthUser>;

  private currentUserSubject = new BehaviorSubject<IAuthUser>(JSON.parse(this.getTokenFromStorage()));
  private RETURN_URL = 'returnUrl';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): IAuthUser {
    return this.currentUserSubject.value;
  }

  signup(name: string, password: string): Observable<object> {
    return this.http.post('auth/signup', { name, password });
  }

  login(payload: { phone: string, password: string }): Observable<IAuthUser> {
    return this.http.post<IAuthUser>('/login', payload)
      .pipe(
        map(user => {
          if (user && user.token) {
            this.storageToken(JSON.stringify(user));
            this.currentUserSubject.next(user);
          }

          return user;
        }),
        tap(_ => {
          const returnUrl = this.route.snapshot.queryParams[this.RETURN_URL] || '/';
          this.router.navigate([returnUrl]);
        })
      );
  }

  logout() {
    this.storageToken(null);
    this.currentUserSubject.next(null);
    this.router.navigate(['login'], { queryParams: { returnUrl: '/' } });
  }

  private storageToken(value: string): void {
    const savedValue = this.getStoredItem();
    if (value) {
      savedValue[AUTH_FIELD.CURRENT_USER] = value;
    } else {
      delete savedValue[AUTH_FIELD.CURRENT_USER];
    }
    localStorage.setItem(AUTH_CONST.STORAGE_NAME, JSON.stringify(savedValue));
  }

  private getStoredItem() {
    const saved: string = localStorage.getItem(AUTH_CONST.STORAGE_NAME) || '{}';
    return JSON.parse(saved);
  }

  private getTokenFromStorage(): string {
    const savedValue = this.getStoredItem();
    return savedValue[AUTH_FIELD.CURRENT_USER] || null;
  }
}
