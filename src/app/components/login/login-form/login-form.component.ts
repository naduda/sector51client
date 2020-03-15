import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

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
    this.form = fb.group({
      phone: ['', Validators.required],
      password: ['', Validators.required],
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
