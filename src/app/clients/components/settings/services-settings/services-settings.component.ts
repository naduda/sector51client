import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { IService } from '@clients/model/interfaces';
import { ClientService } from '@clients/services/client.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'sector-services-settings',
  templateUrl: './services-settings.component.html',
  styleUrls: ['./services-settings.component.sass']
})
export class ServicesSettingsComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'price'];
  data: IService[] = [];

  constructor(
    private dialogRef: MatSnackBarRef<ServicesSettingsComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public dialogData: any,
    private clientService: ClientService,
  ) { }

  ngOnInit(): void {
    this.clientService.services$
      .pipe(take(1))
      .subscribe(e => this.data = e);
  }

  close() {
    this.dialogRef.dismiss();
  }
}
