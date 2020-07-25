import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IService } from '@clients/model/interfaces';
import { IUserService } from '@clients/model/user.service';
import { ClientService } from '@clients/services/client.service';
import { dateAdd, EDateValueType } from '@core/utils/date.utils';
import { ADestroyDirective } from '@shared/helpers/abstract-destroy';
import { filter, switchMap, take, takeUntil } from 'rxjs/operators';
import {
  ABONEMENT_SERVICE_ID_CALCULATOR,
  ABONEMENT_TYPES_MAP,
  EAbonementType,
  IAbonementPeriod,
  IAbonementType
} from '../abonement.constants';
import { CreateServiceFormComponent } from '../create-service-form/create-service-form.component';

interface IPeriod {
  beg: Date;
  end: Date;
}

@Component({
  selector: 'sector-create-service-wizard',
  templateUrl: './create-service-wizard.component.html',
  styleUrls: ['./create-service-wizard.component.sass']
})
export class CreateServiceWizardComponent extends ADestroyDirective implements OnChanges {

  @Input() clientId: string;
  @Input() services: IService[];
  @Input() userServices: IUserService[];

  @Output() onCreate = new EventEmitter<void>();

  form: FormGroup;
  result: IUserService;
  filteredServices: IService[];

  abonementTypes: IAbonementType[] = [];
  abonementPeriods: IAbonementPeriod[] = [
    { value: 1, label: 'Month' },
    { value: 3, label: '3 monthes' },
    { value: 6, label: '6 monthes' },
    { value: 12, label: 'Year' },
  ];

  private serviceList = [0, 1, 2, 14];

  constructor(
    fb: FormBuilder,
    private dialog: MatDialog,
    private clientService: ClientService,
  ) {
    super();

    this.form = this.buildForm(fb);

    Object.keys(EAbonementType).forEach(key => {
      const value = EAbonementType[key];
      this.abonementTypes.push({
        value,
        label: ABONEMENT_TYPES_MAP.get(value),
      });
    });

    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(e => this.calculateServiceId(e));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.clientId && this.userServices && this.services) {
      this.filteredServices = this.services.filter(z => this.serviceList.includes(z.id));
      const hasAbonement = this.userServices.some(z => 3 <= z.idService && z.idService <= 13 || z.idService === 0 || z.idService === 14);
      if (hasAbonement) {
        this.filteredServices = this.filteredServices.filter(z => z.id !== 0 && z.id !== 14);
      }

      // todo: TRAINER
      this.filteredServices = this.filteredServices.filter(z => z.id !== 1);

      const exist = this.userServices.map(z => z.idService);
      this.filteredServices = this.filteredServices.filter(z => !exist.includes(z.id));

      if (this.filteredServices.length) {
        this.serviceControl.setValue(this.filteredServices[0].id, { emitEven: false });
      }
    }
  }

  submit() {
    this.dialog.open(CreateServiceFormComponent, {
      disableClose: true,
      panelClass: 'without-paddings',
      data: {
        userService: this.result,
      }
    }).afterClosed()
      .pipe(
        take(1),
        filter(e => !!e),
        switchMap(e => this.clientService.createUserService(e))
      )
      .subscribe(_ => {
        this.filteredServices = this.filteredServices.filter(z => z.id !== this.result.idService);
        if (this.filteredServices.length) {
          this.serviceControl.setValue(this.filteredServices[0].id, { emitEven: false });
        }
        this.result = null;
        this.onCreate.emit();
      });
  }

  private calculateServiceId(formValue: { service: number, abonType: EAbonementType, abonPeriod: number }) {
    const abonPeriod = formValue.abonPeriod || 1;
    const period = this.calculatePeriod(abonPeriod);

    if (formValue.service !== 0) {
      const s = this.services.find(z => z.id === formValue.service);
      this.result = {
        idUser: this.clientId,
        idService: formValue.service,
        name: s.name,
        price: s.price,
        dtBeg: period.beg.getTime(),
        dtEnd: period.end.getTime(),
        value: 0,
      };
      return;
    }

    const abonsByType = ABONEMENT_SERVICE_ID_CALCULATOR[formValue.abonType];
    if (abonsByType) {
      const s = this.services.find(e => e.id === abonsByType[abonPeriod]);
      this.result = {
        idUser: this.clientId,
        idService: abonsByType[abonPeriod],
        name: s.name,
        price: s.price,
        dtBeg: period.beg.getTime(),
        dtEnd: period.end.getTime(),
        value: 0,
      };
    } else {
      this.result = null;
    }
  }

  get serviceControl(): AbstractControl {
    return this.form.get('service');
  }

  get abonTypeControl(): AbstractControl {
    return this.form.get('abonType');
  }

  private buildForm(fb: FormBuilder): FormGroup {
    return fb.group({
      service: [null],
      abonType: [null],
      abonPeriod: [null],
    });
  }

  private calculatePeriod(periodInMonth: number): IPeriod {
    const beg = new Date();
    const end = dateAdd(beg, EDateValueType.MONTH, periodInMonth);
    return { beg, end };
  }
}
