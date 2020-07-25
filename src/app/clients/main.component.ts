import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { skip, takeUntil } from 'rxjs/operators';
import { ADestroyDirective } from '../shared/helpers/abstract-destroy';
import { NavigationService } from './services/navigation.service';
import { NavigationState } from './state/navigation.store';
import { ENavigationState } from './state/state.enum';

@Component({
  selector: 'sector-clients-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent extends ADestroyDirective implements OnInit {

  constructor(
    private navigationService: NavigationService,
    private router: Router
  ) {
    super();

    navigationService.state$
      .pipe(
        takeUntil(this.destroy$),
        skip(1),
      )
      .subscribe(e => this.changeRoute(e));
  }

  ngOnInit(): void {
    this.setStateByLocation();
  }

  private changeRoute(v: NavigationState) {
    const commands = ['clients', v.state];
    if (v.clientId && v.state !== ENavigationState.LIST) {
      commands.push(v.clientId);
    }

    this.router.navigate(commands);
  }

  private setStateByLocation() {
    const path = location.hash.substring(2).split('/');

    this.navigationService.state = {
      state: path[1] as ENavigationState,
      clientId: path.length > 2 ? path[2] : null,
    };
  }
}
