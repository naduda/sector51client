import { Injectable } from '@angular/core';
import { Store } from '@shared/state/store';
import { ENavigationState } from './state.enum';

export class NavigationState {
  clientId: string;
  state: ENavigationState;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationStore extends Store<NavigationState> {

  constructor() {
    super(new NavigationState());
  }

}
