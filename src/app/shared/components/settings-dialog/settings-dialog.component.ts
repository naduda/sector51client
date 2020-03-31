import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

export interface ISettingsDialogData {
  title: string;
}

@Component({
  selector: 'sector-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.sass']
})
export class SettingsDialogComponent {

  constructor(
    private dialogRef: MatSnackBarRef<any>,
    @Inject(MAT_SNACK_BAR_DATA) public data: ISettingsDialogData,
  ) { }

  close(): void {
    this.dialogRef.dismiss();
  }
}
