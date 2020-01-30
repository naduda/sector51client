import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'sector-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss']
})
export class TopNavigationComponent implements OnInit, OnDestroy {
  expanded: boolean;
  items: MenuItem[];

  private destroy$ = new Subject<void>();
  private translations = {
    clients: '',
    addClient: '',
    settings: ''
  };

  constructor(
    private translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.translate.stream(Object.keys(this.translations))
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(e => {
        this.translations = e;
        this.setItems();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setItems(): void {
    this.items = [
      {
        label: this.translations.clients,
        icon: 'pi pi-fw pi-users',
        items: [
          {
            label: this.translations.addClient,
            icon: 'pi pi-fw pi-user-plus'
          }
        ]
      },
      {
        label: this.translations.settings,
        icon: 'pi pi-fw pi-cog'
      }
    ];
  }
}
