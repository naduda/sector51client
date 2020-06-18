import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EBoxType } from '@clients/model/enums';
import { IBox } from '@clients/model/interfaces';
import { IUserService, UserService } from '@clients/model/user.service';
import { ClientService } from '@clients/services/client.service';
import { finalize, map, take } from 'rxjs/operators';

@Component({
  selector: 'sector-create-service-form',
  templateUrl: './create-service-form.component.html',
  styleUrls: ['./create-service-form.component.sass']
})
export class CreateServiceFormComponent {

  form: FormGroup;

  loading: boolean;
  isBox: boolean;
  boxes: IBox[];
  name: string;

  constructor(
    clientService: ClientService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    fb: FormBuilder,
  ) {
    this.loading = true;
    const userService: IUserService = data.userService;

    this.isBox = userService.idService === 2;
    this.name = userService.name;

    this.form = fb.group({
      ...UserService.toFormValue(userService),
      price: [{ value: userService.price, disabled: true }],
    });

    if (this.isBox) {
      this.form.get('value').setValidators([
        Validators.required,
        Validators.min(1),
        Validators.max(50)
      ]);
    }

    clientService.boxList$()
      .pipe(
        finalize(() => this.loading = false),
        take(1),
        map(e => e.filter(z => z.idType === EBoxType.COMMON && !z.card)),
      )
      .subscribe(e => this.boxes = e);
  }

}
