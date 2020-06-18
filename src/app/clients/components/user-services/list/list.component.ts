import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { EBoxType } from '@clients/model/enums';
import { IBox } from '@clients/model/interfaces';
import { IUserService, IUserServiceFormValue, UserService } from '@clients/model/user.service';
import { ClientService } from '@clients/services/client.service';
import { ADestroyHelper } from '@shared/helpers/abstract-destroy';
import { ConfirmService } from '@shared/services/confirm.service';
import { catchError, finalize, map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'sector-user-service-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class UserServiceListComponent extends ADestroyHelper implements OnChanges {

  @Input() userServices: IUserService[];

  @Output() onDelete = new EventEmitter<void>();

  displayedColumns: string[] = ['idx', 'name', 'dtBeg', 'dtEnd', 'value', 'save', 'delete'];
  form: FormGroup;
  boxes: IBox[];
  loading: boolean;

  constructor(
    private confirmService: ConfirmService,
    private clientService: ClientService,
    private fb: FormBuilder,
  ) {
    super();

    this.form = fb.group({
      rows: fb.array([]),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.userServices && changes.userServices.currentValue) {
      this.initBoxesIfNeeded();
      this.rowsControl.clear();
      this.userServices.forEach(e => this.addRow(e));
    }
  }

  saveService(idx: number) {
    const row = this.rowsControl.controls[idx];
    if (row.invalid) {
      return;
    }

    this.loading = true;
    this.clientService.updateUserService(row.value)
      .pipe(
        finalize(() => this.loading = false),
        catchError((ex) => {
          alert('Something went wrong...');
          throw ex;
        })
      )
      .subscribe();
  }

  deleteService(idx: number) {
    const row = this.rowsControl.controls[idx];
    if (row.invalid) {
      return;
    }

    const confirm = {
      title: 'You are going to delete current item',
      message: 'Are you sure?',
    };
    this.confirmService.confirm(confirm).subscribe(e => console.log(e));

    return;

    this.loading = true;
    const us = row.value as IUserService;
    this.clientService.deleteUserService(us)
      .pipe(
        finalize(() => this.loading = false),
        catchError((ex) => {
          alert('Something went wrong...');
          throw ex;
        })
      )
      .subscribe(_ => this.onDelete.emit());
  }

  private initBoxesIfNeeded() {
    if (!this.boxes && this.userServices.some(e => e.idService === 2)) {
      return this.clientService.boxList$()
        .pipe(
          take(1),
          map(e => e.filter(z => z.idType === EBoxType.COMMON)),
          tap(e => this.boxes = e),
        )
        .subscribe();
    }
  }

  private addRow(s: IUserService) {
    const formValue = UserService.toFormValue(s);

    const row = this.fb.group(formValue, {
      validators: this.rowValidator()
    });

    this.rowsControl.push(row);
  }

  get rowsControl(): FormArray {
    return this.form.get('rows') as FormArray;
  }

  private rowValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const v = control.value as IUserServiceFormValue;
      if (v.idService === 2) {
        if (isNaN(+v.value)) {
          return { invalidValue: true };
        }
      }
      return null;
    };
  }
}
