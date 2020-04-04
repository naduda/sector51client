import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { AValueAccessor } from './abstract.value-accessor';

export abstract class AValueAccessorWhithDestroy extends AValueAccessor implements OnDestroy {

  protected destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
