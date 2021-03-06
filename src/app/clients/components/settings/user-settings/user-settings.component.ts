import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { IUser } from '@clients/model/interfaces';
import { ClientService } from '@clients/services/client.service';
import { ADestroyDirective } from '@shared/helpers/abstract-destroy';
import { Observable } from 'rxjs';
import { filter, finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'sector-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.sass']
})
export class UserSettingsComponent extends ADestroyDirective implements OnInit {

  form: FormGroup;
  waiting: boolean;

  private user: IUser;

  constructor(
    private clientService: ClientService,
    private dialogRef: MatSnackBarRef<UserSettingsComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public dialogData: any,
    fb: FormBuilder,
  ) {
    super();

    const nameValidators = [
      Validators.required,
      Validators.pattern(/^([^0-9]*)$/),
      Validators.minLength(2),
      Validators.maxLength(25)
    ];
    this.form = fb.group({
      surname: [null, nameValidators],
      name: [null, nameValidators],
      phone: [null, [Validators.required]],
      card: [null, [Validators.required, Validators.pattern(/\d/), Validators.minLength(13), Validators.maxLength(15)]],
      isMan: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    const payload$ = this.dialogData.payload$ as Observable<any>;
    payload$
      .pipe(
        takeUntil(this.destroy$),
        filter(e => !!e)
      )
      .subscribe(e => {
        this.user = {
          ...e,
          phone: this.trimPhone(e.phone)
        };
        this.form.patchValue(this.user);
      });
  }

  close() {
    this.dialogRef.dismiss();
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const v = this.form.value;
    const user = {
      ...this.user,
      surname: v.surname,
      name: v.name,
      phone: `+380${v.phone}`,
      card: v.card,
      isMan: v.isMan
    };

    this.waiting = true;
    this.clientService.updateUser(user)
      .pipe(finalize(() => this.waiting = false))
      .subscribe(_ => this.close());
  }

  private trimPhone(v: string): string {
    if (!v) {
      return '';
    }
    v = v.replace(/[()-\s\+]/g, '');
    return v.substring(v.length - 9);
  }
}
