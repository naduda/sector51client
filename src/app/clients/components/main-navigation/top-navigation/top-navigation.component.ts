import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from '../../../model/interfaces';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'sector-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.sass']
})
export class TopNavigationComponent implements OnInit {

  user: IUser;

  constructor(
    private clientService: ClientService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.clientService.whoami.subscribe(e => this.user = e);
  }

  logout() {
    this.authService.logout();
  }
}
