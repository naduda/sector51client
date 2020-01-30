import { Component, Input, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { take, tap } from 'rxjs/operators';
import { IUser } from 'src/app/main/model/interface';
import { UserService } from 'src/app/main/services/user.service';

@Component({
  selector: 'sector-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  @Input() signup: true;

  user: IUser;
  roles: SelectItem[];
  password: string;
  showPassword: boolean;
  minDateValue: Date;
  maxDateValue: Date;

  private showPasswordRoles: string[];

  constructor(private userService: UserService) {
    const curDate = new Date();
    this.minDateValue = new Date(curDate.getFullYear() - 70, 1, 1);
    this.maxDateValue = new Date(curDate.getFullYear() - 13, 1, 1);
  }

  ngOnInit() {
    this.userService.whoami
      .pipe(
        take(1),
        tap(response => this.setRoles(response))
      )
      .subscribe();
  }

  private setRoles(response: SelectItem[]): void {
    this.roles = response;
    this.user = {
      name: 'n',
      surname: 's',
      card: '1',
      phone: '0506666666',
      birthday: new Date(),
      gender: true,
      role: response.find(e => e.label === 'user').value
    };

    this.showPasswordRoles = this.roles
      .filter(e => !e.disabled)
      .map(e => e.value);

    this.roles.forEach(e => e.disabled = false);
  }

  changeRole(role: string) {
    this.showPassword = this.showPasswordRoles.includes(role);
  }

  submit({ value }) {
    if (value.password !== this.password) {
      alert('password');
      return;
    }

    const birthday = value.birthday;
    const clone = JSON.parse(JSON.stringify(value));
    delete clone.password2;
    clone.birthday = Date.UTC(birthday.getUTCFullYear(), birthday.getUTCMonth(), birthday.getUTCDate());

    this.userService.createUser(clone).subscribe();
  }
}
