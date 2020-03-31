import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, takeUntil } from 'rxjs/operators';
import { IUser } from '../../model/interfaces';
import { ESettings } from '../../model/settings.enum';
import { ClientService } from '../../services/client.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'sector-tree-navigation',
  templateUrl: './tree-navigation.component.html',
  styleUrls: ['./tree-navigation.component.sass']
})
export class TreeNavigationComponent implements OnInit, OnDestroy {

  users: Partial<IUser>[];
  statusInfo: string;

  private filterSubject = new BehaviorSubject<string>(null);
  private destroy$ = new Subject<void>();

  constructor(
    private clientService: ClientService,
    private settingsService: SettingsService,
  ) { }

  ngOnInit(): void {
    this.filterSubject.asObservable()
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(),
        debounceTime(500),
        map(e => e ? e.toLowerCase().trim() : ''),
        switchMap(e => this.clientService.getFilteredClients(e))
      )
      .subscribe(e => {
        this.users = e;
        this.statusInfo = `${e.length} clients`;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  filterClients(v: string) {
    this.filterSubject.next(v);
  }

  userSettings(user: IUser) {
    this.settingsService.open(ESettings.USER_SETTINGS, user);
  }
}
