import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

export interface IConfirmDialog {
  title: string;
  message: string;
  acceptLabel?: string;
  rejectLabel?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(private dialog: MatDialog) { }

  confirm(data: IConfirmDialog): Observable<boolean> {
    return this.dialog.open(ConfirmDialogComponent, { data })
      .afterClosed();
  }
}
