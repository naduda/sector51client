import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rest } from '../constants/rest';
import { IUser } from '../model/interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  get whoami(): Observable<any> {
    return this.http.get<any>(Rest.GET.whoami);
  }

  createUser(user: IUser): Observable<object> {
    return this.http.post<IUser>(Rest.POST.user, user);
  }
}
