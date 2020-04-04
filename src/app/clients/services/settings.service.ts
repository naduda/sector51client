import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarDismiss, MatSnackBarRef } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ServicesSettingsComponent } from '../components/settings/services-settings/services-settings.component';
import { UserSettingsComponent } from '../components/settings/user-settings/user-settings.component';
import { ESettings } from '../model/settings.enum';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private currentOpenedTypeSubject = new BehaviorSubject<ESettings>(ESettings.EMPTY);
  private currentPayloadSubject = new Subject<any>();
  private dialogRef: MatSnackBarRef<unknown>;

  constructor(
    private dialog: MatSnackBar,
  ) { }

  open(type: ESettings, data?: any): Observable<MatSnackBarDismiss> {
    if (this.currentOpenedTypeSubject.value === type) {
      this.currentPayloadSubject.next(data);
      return;
    }

    const componentType = this.getComponentTypeByEnum(type);
    this.dialogRef = this.dialog.openFromComponent(componentType, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'sector-settings-right',
      data: {
        title: this.getTitleByEnum(type),
        payload$: this.currentPayloadSubject.asObservable()
      }
    });

    this.dialogRef.afterOpened().pipe(take(1))
      .subscribe(_ => {
        this.currentPayloadSubject.next(data);
        this.currentOpenedTypeSubject.next(type);
      });

    return this.dialogRef.afterDismissed()
      .pipe(
        take(1),
        tap(_ => {
          this.currentOpenedTypeSubject.next(ESettings.EMPTY);
          this.currentPayloadSubject.next(null);
        })
      );
  }

  private getComponentTypeByEnum(type: ESettings): ComponentType<unknown> {
    switch (type) {
      case ESettings.SERVICES:
        return ServicesSettingsComponent;
      case ESettings.USER_SETTINGS:
        return UserSettingsComponent;
      default:
        return null;
    }
  }

  private getTitleByEnum(v: ESettings) {
    switch (v) {
      case ESettings.SERVICES:
        return 'Services Settings';
      case ESettings.USER_SETTINGS:
        return 'Client Settings';
      default:
        return '';
    }
  }
}
