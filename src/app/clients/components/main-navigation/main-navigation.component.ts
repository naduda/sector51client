import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { shareReplay } from 'rxjs/internal/operators/shareReplay';
import { IUser } from '../../model/interfaces';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'sector-main-nav',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.sass']
})
export class MainNavigationComponent {

  isHandset$: Observable<BreakpointState>;
  operator$: Observable<IUser>;

  constructor(
    breakpointObserver: BreakpointObserver,
    clientService: ClientService,
    private authService: AuthService,
  ) {
    this.isHandset$ = breakpointObserver.observe(Breakpoints.HandsetPortrait)
      .pipe(shareReplay());

    this.operator$ = clientService.whoami$;
  }

  logout() {
    this.authService.logout();
  }
}
