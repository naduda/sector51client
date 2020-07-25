import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ADestroyDirective } from '@shared/helpers/abstract-destroy';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { IUser } from '../../model/interfaces';
import { ESettings } from '../../model/settings.enum';
import { ClientService } from '../../services/client.service';
import { NavigationService } from '../../services/navigation.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'sector-tree-navigation',
  templateUrl: './tree-navigation.component.html',
  styleUrls: ['./tree-navigation.component.sass']
})
export class TreeNavigationComponent extends ADestroyDirective implements OnInit, OnDestroy {

  users: Partial<IUser>[];
  statusInfo: string;
  loading: boolean;
  settingsUserId: string;
  activeSettingsType = ESettings.USER_SETTINGS;
  selectedClientId: string;

  private filterSubject = new BehaviorSubject<string>(null);
  private currentUser: IUser;

  constructor(
    private clientService: ClientService,
    private settingsService: SettingsService,
    private navigationService: NavigationService,
    private cdr: ChangeDetectorRef,
  ) {
    super();

    navigationService.state$
      .pipe(takeUntil(this.destroy$))
      .subscribe(e => this.selectedClientId = e.clientId);
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

  selectClient(id: string) {
    this.navigationService.clientId = this.selectedClientId === id ? null : id;
  }

  filterClients(v: string) {
    this.filterSubject.next(v);
  }

  openSettings(user: IUser) {
    this.currentUser = user;
    this.settingsUserId = user.id;
    const ref = this.settingsService.open(this.activeSettingsType, user);
    if (ref) {
      ref.subscribe(dismissedByAction => {
        this.settingsUserId = null;
        this.cdr.detectChanges();
        this.activeSettingsType = ESettings.USER_SETTINGS;
      });
    }
  }
}
