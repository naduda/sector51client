import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ADestroyHelper } from 'src/app/shared/helpers/abstract-destroy';

@Component({
  selector: 'sector-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.sass']
})
export class UserSettingsComponent extends ADestroyHelper implements OnInit {

  data: any;

  constructor(
    private dialogRef: MatSnackBarRef<UserSettingsComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public dialogData: any,
  ) {
    super();
  }

  ngOnInit(): void {
    const payload$ = this.dialogData.payload$ as Observable<any>;
    payload$.pipe(takeUntil(this.destroy$))
      .subscribe(e => this.data = e);
  }

  close() {
    this.dialogRef.dismiss();
  }
}
