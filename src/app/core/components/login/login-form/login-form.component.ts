import { Component, isDevMode, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'sector-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass']
})
export class LoginFormComponent implements OnDestroy {

  form: FormGroup;
  error: string;

  private destroy$ = new Subject<void>();

  constructor(
    fb: FormBuilder,
    private authService: AuthService,
  ) {
    const phone = isDevMode() ? '973947538' : '';
    const psw = isDevMode() ? 'owner' : '';

    this.form = fb.group({
      phone: [phone, Validators.required],
      password: [psw, Validators.required],
    });

    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(_ => this.error = undefined);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  login() {
    if (this.form.invalid) {
      return;
    }

    const value = this.form.value;
    this.authService.login({
      ...value,
      phone: `+380${value.phone}`
    })
      .pipe(
        catchError(err => {
          this.error = err.error;
          throw err;
        })
      )
      .subscribe();
  }
}
