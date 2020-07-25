import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { IUser } from '@clients/model/interfaces';
import { ClientService } from '@clients/services/client.service';
import { AuthService } from '@core/services/auth.service';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'sector-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent {

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
