import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { shareReplay } from 'rxjs/internal/operators/shareReplay';
import { AuthService } from 'src/app/services/auth.service';
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
    clientsService: ClientService,
    private authService: AuthService,
  ) {
    this.isHandset$ = breakpointObserver.observe(Breakpoints.HandsetPortrait)
      .pipe(shareReplay());

    this.operator$ = clientsService.whoami;
  }

  logout() {
    this.authService.logout();
  }
}
