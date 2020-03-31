import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import { IService } from 'src/app/clients/model/interfaces';
import { ServicesService } from 'src/app/clients/services/services.service';

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
    private servicesService: ServicesService,
  ) { }

  ngOnInit(): void {
    this.servicesService.services$
      .pipe(take(1))
      .subscribe(e => this.data = e);
  }

  close() {
    this.dialogRef.dismiss();
  }
}
