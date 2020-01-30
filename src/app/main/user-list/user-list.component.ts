import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/common/auth/auth-service.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'sector-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.whoami.subscribe();
  }

  logout() {
    this.authService.logout();
  }
}
