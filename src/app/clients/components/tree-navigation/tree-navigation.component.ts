import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ADestroyHelper } from 'src/app/shared/helpers/abstract-destroy';
import { IUser } from '../../model/interfaces';
import { ESettings } from '../../model/settings.enum';
import { ClientService } from '../../services/client.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'sector-tree-navigation',
  templateUrl: './tree-navigation.component.html',
  styleUrls: ['./tree-navigation.component.sass']
})
export class TreeNavigationComponent extends ADestroyHelper implements OnInit, OnDestroy {

  users: Partial<IUser>[];
  statusInfo: string;
  loading: boolean;
  settingsUserId: string;

  private filterSubject = new BehaviorSubject<string>(null);

  constructor(
    private clientService: ClientService,
    private settingsService: SettingsService,
    private cdr: ChangeDetectorRef,
  ) {
    super();
  }

  ngOnInit(): void {
    this.filterSubject.asObservable()
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(),
        debounceTime(500),
        map(e => e ? e.toLowerCase().trim() : ''),
        tap(_ => this.loading = true),
        switchMap(e => this.clientService.getFilteredClients(e).pipe(finalize(() => this.loading = false))),
      )
      .subscribe(e => {
        this.users = e;
        this.statusInfo = `${e.length} clients`;
      });
  }

  filterClients(v: string) {
    this.filterSubject.next(v);
  }

  openUserSettings(user: IUser) {
    this.settingsUserId = user.id;
    const ref = this.settingsService.open(ESettings.USER_SETTINGS, user);
    if (ref) {
      ref.subscribe(_ => {
        this.settingsUserId = null;
        this.cdr.detectChanges();
      });
    }
  }
}
