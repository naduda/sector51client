import { ControlValueAccessor } from '@angular/forms';

export abstract class AValueAccessor implements ControlValueAccessor {

  abstract onUpdate(value?: any): void;
  abstract writeValue(value: any): void;

  registerOnChange(fn: any): void { }
  registerOnTouched(fn: any): void { }
  setDisabledState?(isDisabled: boolean): void { }

  onChange = (_: any) => { };
  onTouched = () => { };

}
