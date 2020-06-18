import { BehaviorSubject, Observable } from 'rxjs';

export abstract class Store<T> {
  private stateCache$: BehaviorSubject<T>;

  protected constructor(initialState: T) {
    this.stateCache$ = new BehaviorSubject(initialState);
  }

  get state$(): Observable<T> {
    return this.stateCache$.asObservable();
  }

  get state(): T {
    return this.stateCache$.getValue();
  }

  setState(value: T) {
    this.stateCache$.next(value);
  }
}
