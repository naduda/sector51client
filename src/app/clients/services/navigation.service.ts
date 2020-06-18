import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationState, NavigationStore } from '../state/navigation.store';
import { ENavigationState } from '../state/state.enum';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  state$: Observable<NavigationState>;

  constructor(private store: NavigationStore) {
    this.state$ = store.state$;
  }

  set state(state: NavigationState) {
    this.store.setState(state);
  }

  set routeState(state: ENavigationState) {
    this.store.setState({
      ...this.store.state,
      state,
    });
  }

  set clientId(clientId: string) {
    this.store.setState({
      ...this.store.state,
      clientId,
    });
  }
}
