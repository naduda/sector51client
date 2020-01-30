import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/common/auth/auth-service.service';

@Component({
  selector: 'sector-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  waiting = false;

  name: string;
  password: string;
  errorMessage: string;

  constructor(
    private authService: AuthenticationService
  ) {
  }

  ngOnInit() {
  }

  login() {
    this.waiting = true;
    this.authService.login(this.name, this.password)
      .pipe(
        catchError(err => {
          this.errorMessage = err.error;
          return of();
        }),
        finalize(() => this.waiting = false)
      )
      .subscribe();
  }

  signup() {
    this.authService.signup(this.name, this.password).subscribe();
  }
}
