import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { IService } from '../model/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private serviceList$: Observable<IService[]>;

  constructor(private http: HttpClient) { }

  get services$(): Observable<IService[]> {
    if (!this.serviceList$) {
      this.serviceList$ = this.http.get<IService[]>('/private/services')
        .pipe(shareReplay(1));
    }
    return this.serviceList$;
  }
}
