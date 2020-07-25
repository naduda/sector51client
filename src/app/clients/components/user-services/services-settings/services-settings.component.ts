import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { IService } from '@clients/model/interfaces';
import { ClientService } from '@clients/services/client.service';

@Component({
  selector: 'sector-services-settings-page',
  templateUrl: './services-settings.component.html',
  styleUrls: ['./services-settings.component.sass']
})
export class ServicesSettingsPageComponent implements OnChanges {

  @Input() services: IService[];

  displayedColumns: string[] = ['idx', 'name', 'desc', 'price', 'save'];
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
  ) {
    this.form = fb.group({
      rows: fb.array([]),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.services && changes.services.currentValue) {
      this.rowsControl.clear();
      this.services.forEach(e => this.addRow(e));
    }
  }

  saveService(idx: number) {
    const row = this.rowsControl.controls[idx];
    if (row.invalid) {
      return;
    }
    this.clientService.updateService(row.value).subscribe();
  }

  get rowsControl(): FormArray {
    return this.form.get('rows') as FormArray;
  }

  private addRow(s: IService) {
    const row = this.fb.group(s, {
      validators: this.rowValidator()
    });

    this.rowsControl.push(row);
  }

  private rowValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const v = control.value as IService;
      if (!v.name || !v.name.trim().length) {
        return { requiredServiceName: true };
      }
      if (!v.price || v.price <= 0) {
        return { invalidServicePrice: true };
      }
      return null;
    };
  }
}
